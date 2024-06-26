import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { User } from "@prisma/client";
import { pusherServer } from "@/lib/pusher";

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
    if (chat.users.length <= 2) {
      await prisma.message.updateMany({
        where: {
          chatId: chatId,
        },
        data: {
          replyToId: null,
        },
      });
      const deletedChat = await prisma.chat.deleteMany({
        where: { id: chatId, userIds: { hasSome: [currentUser.id] } },
      });
      chat.users.forEach((user) => {
        if (user.email) {
          pusherServer.trigger(user.email, "chat:remove", chat);
        }
      });
      return NextResponse.json(deletedChat);
    }

    const isUserInChat = chat.users.find((user) => user.id === userId);
    if (!isUserInChat) {
      console.log(userId, chatId);
      return new NextResponse("User is not in this chat", { status: 404 });
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

    chat.users.forEach((user) => {
      if (user.id === userId)
        pusherServer.trigger(user.email!, "chat:remove", updatedChat);
      pusherServer.trigger(user.email!, "chat:update", updatedChat);
    });

    return NextResponse.json(updatedChat);
  } catch (error) {
    console.log(error, "ERROR_KICK_USER");
    return new NextResponse("Internal error", { status: 500 });
  }
}
