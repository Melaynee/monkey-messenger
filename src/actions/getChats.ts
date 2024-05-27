import prisma from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

const getChats = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser?.id) {
    return [];
  }
  try {
    const chats = await prisma.chat.findMany({
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
