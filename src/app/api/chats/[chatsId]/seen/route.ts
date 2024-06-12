// Import necessary modules
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import { pusherServer } from "@/lib/pusher";

interface IParams {
  chatsId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    // Get the current user
    const currentUser = await getCurrentUser();
    const chatId = params.chatsId;
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unathorized", { status: 401 });
    }

    if (!chatId) {
      return new NextResponse(`Chat ID is required`, {
        status: 400,
      });
    }

    // Find the chat with the given chatId
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    });

    // If the chat is not found, return a 404 response
    if (!chat) {
      return new NextResponse("Chat not found", { status: 404 });
    }

    // Get the last message in the chat
    const lastMessage = chat.messages[chat.messages.length - 1];

    // If there is no last message, return the chat
    if (!lastMessage) return NextResponse.json(chat);

    // Update the seen status of the last message
    const updatedMessage = await prisma.message.update({
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

    // Return the updated message
    return NextResponse.json(updatedMessage);
  } catch (error) {
    // Log the error and return a 500 response
    return new NextResponse("Internal Error", { status: 500 });
  }
}
