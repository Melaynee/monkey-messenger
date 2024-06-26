"use client";
import React, { useEffect, useMemo, useState } from "react";
import { FullChatType } from "@/types";
import useChat from "@/hooks/useChats";
import ChatBox from "../ChatBox";
import { useSession } from "next-auth/react";
import { MdOutlineGroupAdd } from "react-icons/md";
import GroupChatModal from "../GroupChat/GroupChatModal";
import { User } from "@prisma/client";
import { pusherClient } from "@/lib/pusher";
import { find, includes } from "lodash";
import { useRouter } from "next/navigation";
import useSearchStore from "@/hooks/useSearchStore";

type Props = { initialItems: FullChatType[]; users: User[] };

const ChatList: React.FC<Props> = ({ initialItems, users }) => {
  const session = useSession();
  const [items, setItems] = useState(initialItems);
  const [isOpen, setIsOpen] = useState(false);
  const { chatId } = useChat();
  const router = useRouter();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) return;

    pusherClient.subscribe(pusherKey);

    const newHandler = (chat: FullChatType) => {
      setItems((current) => {
        if (find(current, { id: chat.id })) return current;

        return [chat, ...current];
      });
    };

    const updateHandler = (chat: FullChatType) => {
      const mappedChat = (currentChat: FullChatType) => {
        if (currentChat.id === chat.id) {
          return { ...currentChat, messages: chat.messages };
        }
        return currentChat;
      };

      setItems((current) => current.map(mappedChat));
    };

    const removeHandler = (chat: FullChatType) => {
      const filteredChat = (singleChat: FullChatType) =>
        singleChat.id !== chat.id;

      setItems((current) => {
        return [...current.filter(filteredChat)];
      });
      if (chatId === chat.id) {
        router.push("/chats");
      }
    };

    pusherClient.bind("chat:new", newHandler);
    pusherClient.bind("chat:update", updateHandler);
    pusherClient.bind("chat:remove", removeHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("chat:new", newHandler);
      pusherClient.unbind("chat:update", updateHandler);
      pusherClient.unbind("chat:remove", removeHandler);
    };
  }, [pusherKey, chatId, router]);

  const { searchQuery } = useSearchStore();
  const filteredChats = items.filter((current: FullChatType) => {
    if (!current.name) {
      const user = current.users?.find(
        (user) => user.email != session.data?.user?.email
      );
      if (user?.name)
        return includes(user?.name.toLowerCase(), searchQuery.toLowerCase());
    }
    if (current.name)
      return includes(current.name.toLowerCase(), searchQuery.toLowerCase());
  });
  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <aside className="w-full">
        <div className="flex justify-between mb-4 px-4">
          <div className="text-2xl font-bold text-dark">Messages</div>
          <div
            onClick={() => setIsOpen(true)}
            className="rounded-full p-2 bg-light text-gray-600 cursor-pointer hover:opacity-75 transition"
          >
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>
        {filteredChats?.map((item) => (
          <ChatBox key={item.id} data={item} selected={chatId === item.id} />
        ))}
      </aside>
    </>
  );
};

export default ChatList;
