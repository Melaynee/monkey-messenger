import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { pusherServer } from "@/lib/pusher";
import { Chat, User } from "@prisma/client";
import { NewChatType } from "@/types";

export async function POST(request: Request) {
  try {
    const currentUser: User | null = await getCurrentUser();
    const body = await request.json();
    const { userId, isGroup, members, name } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    if (isGroup) {
      const newChat: NewChatType = await prisma.chat.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              {
                id: currentUser.id,
              },
            ],
          },
          owner: currentUser.id,
        },
        include: {
          users: true,
          messages: true,
        },
      });
      newChat.users.forEach((user) => {
        if (user.email) {
          pusherServer.trigger(user.email, "chat:new", newChat);
        }
      });

      return NextResponse.json(newChat);
    }

    const existingChats: NewChatType[] | null = await prisma.chat.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
      include: {
        users: true,
        messages: true,
      },
    });

    const singleChat: Chat | null = existingChats?.[0];

    if (singleChat) {
      return NextResponse.json(singleChat);
    }

    const newChat: NewChatType = await prisma.chat.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id,
            },
            {
              id: userId,
            },
          ],
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
            sender: true,
          },
        },
      },
    });

    newChat.users.map((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, "chat:new", newChat);
      }
    });

    return NextResponse.json(newChat);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
