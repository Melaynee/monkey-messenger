import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { pusherServer } from "@/lib/pusher";
import { User } from "@prisma/client";
import { FullChatType } from "@/types";

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

    const existingChat: FullChatType | null = await prisma.chat.findUnique({
      where: {
        id: chatId,
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

    if (!existingChat) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const deletedChat = await prisma.chat.deleteMany({
      where: {
        id: chatId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });

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
