"use client";
import React from "react";
import ChatList from "./chat/organisms/ChatList";
import UserList from "./UserList";
import { User } from "@prisma/client";
import { usePathname } from "next/navigation";
import { FullChatType } from "@/types";

type Props = { chats: FullChatType[]; users: User[] };

const SwitchList = (props: Props) => {
  const pathname = usePathname();
  return (
    <div className=" overflow-auto">
      {pathname === "chats" ? (
        <ChatList initialItems={props.chats} users={props.users} />
      ) : (
        <UserList users={props.users} />
      )}
    </div>
  );
};

export default SwitchList;
