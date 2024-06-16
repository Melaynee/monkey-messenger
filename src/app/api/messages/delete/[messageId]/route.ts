import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { pusherServer } from "@/lib/pusher";
import getCurrentUser from "@/actions/getCurrentUser";
import { Message, User } from "@prisma/client";

export async function DELETE(
  request: Request,
  { params }: { params: { messageId: string } }
) {
  try {
    const currentUser: User | null = await getCurrentUser();
    if (!currentUser?.id || !currentUser?.email)
      return new NextResponse("Unauthorized", { status: 401 });

    const { messageId }: { messageId: string } = params;
    const message: Message | null = await prisma.message.findUnique({
      where: {
        id: messageId,
      },
    });
    if (!message) {
      return new NextResponse("Message not found", { status: 403 });
    }

    const deletedMessage = await prisma.message.delete({
      where: {
        id: messageId,
      },
    });
    const chatId: string = message.chatId;

    await pusherServer.trigger(chatId, "message:delete", deletedMessage);

    return NextResponse.json(deletedMessage);
  } catch (error) {
    console.log("DELETE_MESSAGE_ERROR", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
