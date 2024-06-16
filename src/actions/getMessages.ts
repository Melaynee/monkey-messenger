import prisma from "@/lib/prismadb";
import { Message } from "@prisma/client";

const getMessages = async (chatId: string) => {
  try {
    const messages: Message[] | null = await prisma.message.findMany({
      where: {
        chatId: chatId,
      },
      include: {
        sender: true,
        seen: true,
        replyTo: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return messages;
  } catch (error) {
    return [];
  }
};

export default getMessages;
