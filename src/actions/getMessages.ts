import prisma from "@/lib/prismadb";
import { FullMessageType } from "@/types";

const getMessages = async (chatId: string) => {
  try {
    const messages: FullMessageType[] | null = await prisma.message.findMany({
      where: {
        chatId: chatId,
      },
      include: {
        sender: true,
        seen: true,
        replyTo: {
          select: {
            id: true,
            body: true,
            image: true,
            sender: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
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
