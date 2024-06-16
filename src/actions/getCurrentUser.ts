import prisma from "@/lib/prismadb";
import getSession from "./getSession";
import { Session } from "next-auth";
import { User } from "@prisma/client";

const getCurrentUser = async () => {
  try {
    const session: Session | null = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser: User | null = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error) {
    return null;
  }
};

export default getCurrentUser;
