import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullChatType } from "@/types";
import { User } from "@prisma/client";

const useOtherUser = (chat: FullChatType | { users: User[] }) => {
  const session = useSession();

  const otherUser = useMemo(() => {
    const currentUserEmail = session.data?.user?.email;

    const otherUser =
      chat.users!.filter((user) => user.email !== currentUserEmail) || [];

    return otherUser[0];
  }, [session?.data?.user?.email, chat.users]);

  return otherUser;
};

export default useOtherUser;
