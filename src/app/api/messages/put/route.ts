import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { pusherServer } from "@/lib/pusher";

export async function PUT(request: Request, params: any) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { message, image, chatId, editMessage } = body;

    if (!currentUser?.email || !currentUser?.id)
      return new NextResponse("Unauthorized", { status: 401 });

    const existingMessage = await prisma.message.findUnique({
      where: {
        id: editMessage.id,
      },
    });

    if (!existingMessage) {
      return new NextResponse("Message not found", { status: 404 });
    }

    if (existingMessage.senderId !== currentUser.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const updatedMessage = await prisma.message.update({
      where: {
        id: editMessage.id,
      },
      data: {
        body: message || existingMessage.body,
        image: image || existingMessage.image,
        chatId: chatId || existingMessage.chatId,
        isEdited: true,
      },
      include: {
        seen: true,
        sender: true,
        replyTo: true,
      },
    });

    await pusherServer.trigger(chatId, "message:edit", updatedMessage);

    const updatedChat = await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        lastMessageAt: new Date(),
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    const lastMessage = updatedChat?.messages[updatedChat.messages.length - 1];

    updatedChat?.users.forEach((user) => {
      pusherServer.trigger(user.email!, "chat:update", {
        id: chatId,
        messages: [lastMessage],
      });
    });

    return NextResponse.json(updatedMessage);
  } catch (error) {
    console.log("UPDATE_MESSAGE_ERR", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
