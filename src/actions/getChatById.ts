import prisma from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

const getChatById = async (chatId: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) {
      return null;
    }

    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
      },
      include: {
        users: true,
      },
    });

    return chat;
  } catch {
    return null;
  }
};

export default getChatById;
