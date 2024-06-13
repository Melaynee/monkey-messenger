import prisma from "@/lib/prismadb";

const getMessages = async (chatId: string) => {
  try {
    const messages = await prisma.message.findMany({
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
