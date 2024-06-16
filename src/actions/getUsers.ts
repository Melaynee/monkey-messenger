import prisma from "@/lib/prismadb";

import getSession from "./getSession";
import { Session } from "next-auth";
import { User } from "@prisma/client";

const getUsers = async () => {
  const session: Session | null = await getSession();

  if (!session?.user?.email) {
    return [];
  }

  try {
    const users: User[] | null = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });
    return users;
  } catch (error) {
    return [];
  }
};

export default getUsers;
