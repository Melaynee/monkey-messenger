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
    const { members } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
      },
      include: {
        users: true,
      },
    });

    if (!chat) {
      return new NextResponse("Invalid chat ID", { status: 400 });
    }

    const updatedChat = await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        users: {
          connect: [
            ...members.map((member: { value: string }) => ({
              id: member.value,
            })),
          ],
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

    updatedChat.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, "chat:new", updatedChat);
      }
    });

    return NextResponse.json(updatedChat);
  } catch (error) {
    console.log("ADD_USER_TO_CHAT_ERROR", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
