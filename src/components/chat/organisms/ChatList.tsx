"use client";
import React, { useState } from "react";
import { FullChatType } from "@/types";
import useChat from "@/hooks/useChats";
import ChatBox from "../ChatBox";
import { useSession } from "next-auth/react";
import { MdOutlineGroupAdd } from "react-icons/md";
import GroupChatModal from "../GroupChat/GroupChatModal";
import { User } from "@prisma/client";

type Props = { initialItems: FullChatType[]; users: User[] };

const ChatList: React.FC<Props> = ({ initialItems, users }) => {
  const session = useSession();
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { chatId } = useChat();

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
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
    </>
  );
};

export default ChatList;
