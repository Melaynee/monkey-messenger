import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { pusherServer } from "@/lib/pusher";
import { User } from "@prisma/client";

interface IParams {
  chatsId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const chatId: string = params.chatsId;
    const currentUser: User | null = await getCurrentUser();

    if (!currentUser?.id) {
      return new NextResponse("Unathorized", { status: 401 });
    }

    const existingChat: {
      id: string;
      messages: { id: string }[];
      users: { id: string; email: string | null; name: string | null }[];
    } | null = await prisma.chat.findUnique({
      where: {
        id: chatId,
      },
      select: {
        id: true,
        messages: {
          select: {
            id: true,
            replyTo: true,
          },
        },
        users: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    if (!existingChat) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    await prisma.message.updateMany({
      where: {
        chatId: chatId,
      },
      data: {
        replyToId: null,
      },
    });

    const deletedChat = await prisma.chat.delete({
      where: {
        id: chatId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });

    if (existingChat.users)
      existingChat.users.forEach((user) => {
        if (user.email) {
          pusherServer.trigger(user.email, "chat:remove", existingChat);
        }
      });

    return NextResponse.json(deletedChat);
  } catch (error) {
    console.log(error, "ERROR_CHAT_DELETE");
    return new NextResponse("Internal error", { status: 500 });
  }
}
