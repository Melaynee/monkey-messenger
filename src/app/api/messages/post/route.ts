import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { pusherServer } from "@/lib/pusher";
import { Message, User } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const currentUser: User | null = await getCurrentUser();
    const body = await request.json();
    const { message, image, chatId, replyMessage } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const newMessage = await prisma.message.create({
      data: {
        body: message,
        image,
        replyTo: replyMessage
          ? {
              connect: {
                id: replyMessage.id,
                body: replyMessage.body,
              },
            }
          : undefined,

        chat: {
          connect: {
            id: chatId,
          },
        },
        sender: {
          connect: {
            id: currentUser.id,
          },
        },
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        seen: true,
        sender: true,
        replyTo: true,
      },
    });

    const updatedChat = await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
            sender: true,
          },
        },
      },
    });

    await pusherServer.trigger(chatId, "messages:new", newMessage);

    const lastMessage: Message =
      updatedChat.messages[updatedChat.messages.length - 1];

    updatedChat.users.map((user) => {
      pusherServer.trigger(user.email!, "chat:update", {
        id: chatId,
        messages: [lastMessage],
      });
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    console.error(error, "ERROR_MESSAGE");
    return new NextResponse("Internal Error", { status: 500 });
  }
}