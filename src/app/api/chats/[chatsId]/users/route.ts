import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { chatsId: string } }
) {
  try {
    const chatId: string = params.chatsId;
    const chat: {
      users: { id: string; name: string | null; email: string | null }[];
    } | null = await prisma.chat.findUnique({
      where: {
        id: chatId,
      },
      select: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    return NextResponse.json(chat?.users || []);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
