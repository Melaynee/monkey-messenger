import prisma from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";
import { User } from "@prisma/client";

const getChatById = async (chatId: string) => {
  try {
    const currentUser: User | null = await getCurrentUser();

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
