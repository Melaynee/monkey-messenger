import prisma from "@/lib/prismadb";
import { Message } from "@prisma/client";

const getMessageById = async (chatId: string, messageId: string | null) => {
  try {
    const messages: Message[] | null = await prisma.message.findMany({
      where: {
        chatId: chatId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return messages.filter((message) => {
      return message.id === messageId;
    });
  } catch (error) {
    return null;
  }
};

export default getMessageById;
