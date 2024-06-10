import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { pusherServer } from "@/lib/pusher";

export async function DELETE(
  request: Request,
  { params }: { params: { messageId: string } }
) {
  try {
    const { messageId } = params;
    const message = await prisma.message.findUnique({
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
    const chatId = message.chatId;

    await pusherServer.trigger(chatId, "message:delete", deletedMessage);

    return NextResponse.json(deletedMessage);
  } catch (error) {
    console.log("DELETE_MESSAGE_ERROR", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
