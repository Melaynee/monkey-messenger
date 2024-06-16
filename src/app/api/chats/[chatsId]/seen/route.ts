// Import necessary modules
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import { pusherServer } from "@/lib/pusher";
import { User } from "@prisma/client";
import { FullChatType, FullMessageType } from "@/types";

interface IParams {
  chatsId: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser: User | null = await getCurrentUser();
    const chatId: string = params.chatsId;
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unathorized", { status: 401 });
    }

    if (!chatId) {
      return new NextResponse(`Chat ID is required`, {
        status: 400,
      });
    }

    const chat: FullChatType | null = await prisma.chat.findUnique({
      where: {
        id: chatId,
      },
      include: {
        messages: {
          include: {
            seen: true,
            sender: true,
          },
        },
        users: true,
      },
    });

    if (!chat) {
      return new NextResponse("Chat not found", { status: 404 });
    }

    const lastMessage: FullMessageType | null =
      chat.messages[chat.messages.length - 1];

    if (!lastMessage) return NextResponse.json(chat);

    const updatedMessage: FullMessageType | null = await prisma.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    if (!updatedMessage)
      return new NextResponse("Failed to update message", { status: 400 });

    await pusherServer.trigger(currentUser.email, "chat:update", {
      id: chatId,
      messages: [updatedMessage],
    });

    if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
      return NextResponse.json(chat);
    }

    await pusherServer.trigger(chatId, "message:update", updatedMessage);

    return NextResponse.json(updatedMessage);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
