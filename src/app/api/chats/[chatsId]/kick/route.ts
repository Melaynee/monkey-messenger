import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { User } from "@prisma/client";

export async function POST(
  request: Request,
  { params }: { params: { chatsId: string; userId: string } }
) {
  try {
    const currentUser: User | null = await getCurrentUser();
    const body = await request.json();
    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const chatId = params.chatsId;
    const userId = body.userId;
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
      },
      include: {
        users: true,
        messages: true,
      },
    });
    if (!chat) {
      return new NextResponse("Invalid chat ID", { status: 400 });
    }
    const isUserInChat = chat.users.find((user) => user.id === userId);
    if (!isUserInChat) {
      console.log(userId, chatId);
      return new NextResponse("User is not in this chat", { status: 400 });
    }
    if (isUserInChat.id === currentUser.id) {
      return new NextResponse("You cannot kick yourself", { status: 400 });
    }
    const updatedChat = await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        users: { disconnect: { id: userId } },
      },
      include: {
        users: true,
      },
    });
    return NextResponse.json(updatedChat);
  } catch (error) {
    console.log(error, "ERROR_KICK_USER");
    return new NextResponse("Internal error", { status: 500 });
  }
}
