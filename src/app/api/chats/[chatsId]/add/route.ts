import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { pusherServer } from "@/lib/pusher";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { chatsId: string } }
) {
  try {
    const currentUser: User | null = await getCurrentUser();
    const chatId: string = params.chatsId;
    const body = await request.json();
    const { userId } = body;

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
      },
    });

    if (chat?.owner !== currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const updatedChat = await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        users: {
          connect: {
            id: user.id,
          },
        },
      },
      include: {
        users: true,
      },
    });

    updatedChat.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, "chat:update", { id: chatId });
      }
    });

    return NextResponse.json(updatedChat);
  } catch (error) {
    console.log("ADD_USER_TO_CHAT_ERROR", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
