"use client";
import React, { useState } from "react";
import { FullChatType } from "@/types";
import { useRouter } from "next/navigation";
import { Chat, Message, User } from "@prisma/client";
import UserItem from "../UserItem";
import useChat from "@/hooks/useChats";
import AvatarComponent from "../Avatar";
import UserBox from "../UserBox";

type Props = { chats: FullChatType[] };

const ChatList = (props: Props) => {
  const router = useRouter();
  const [items, setItems] = useState(props.chats);
  const { chatId } = useChat();
  return (
    <div className="w-full">
      {items.map((chat) => (
        <UserBox
          key={chat.id}
          user={chat.users[0]}
          handleClick={() => router.push(`/chat/${chat.id}`)}
          selected={chatId === chat.id}
        />
      ))}
    </div>
  );
};

export default ChatList;
