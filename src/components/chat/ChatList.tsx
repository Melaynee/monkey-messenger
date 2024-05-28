"use client";
import React, { useState } from "react";
import { FullChatType } from "@/types";
import useChat from "@/hooks/useChats";
import ChatBox from "./ChatBox";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MdOutlineGroupAdd } from "react-icons/md";

type Props = { initialItems: FullChatType[] };

const ChatList: React.FC<Props> = ({ initialItems }) => {
  const session = useSession();
  const [items, setItems] = useState(initialItems);
  const [isOpen, setIsModalOpen] = useState(false);
  const { chatId } = useChat();

  const router = useRouter();
  return (
    <aside className="w-full">
      <div className="flex justify-between mb-4 px-4">
        <div className="text-2xl font-bold text-dark">Messages</div>
        <div
          onClick={() => setIsModalOpen(true)}
          className="rounded-full p-2 bg-light text-gray-600 cursor-pointer hover:opacity-75 transition"
        >
          <MdOutlineGroupAdd size={20} />
        </div>
      </div>
      {items?.map((item) => (
        <ChatBox key={item.id} data={item} selected={chatId === item.id} />
      ))}
    </aside>
  );
};

export default ChatList;
