"use client";
import useChat from "@/hooks/useChats";
import { FullMessageType } from "@/types";
import React, { useEffect, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";

type Props = { initialMessages?: FullMessageType[] };

const ChatBody = ({ initialMessages }: Props) => {
  const [messages, setMessages] = useState(initialMessages);
  const { chatId } = useChat();

  useEffect(() => {
    if (chatId) axios.post(`/api/chats/${chatId}/seen`);
  }, [chatId]);

  return (
    <div className="flex-1 w-full lg:w-3/4 lg:mx-auto">
      {messages!.map((message, i) => (
        <MessageBox
          isLast={i === messages!.length - 1}
          key={message.id}
          data={message}
        />
      ))}
    </div>
  );
};

export default ChatBody;
