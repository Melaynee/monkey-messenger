import prisma from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";
import { Chat, User } from "@prisma/client";

const getChats = async () => {
  const currentUser: User | null = await getCurrentUser();
  if (!currentUser?.id) {
    return [];
  }
  try {
    const chats: Chat[] | null = await prisma.chat.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      where: {
        userIds: {
          hasSome: [currentUser.id],
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });
    return chats;
  } catch (error) {
    return [];
  }
};

export default getChats;
