"use client";
import useChat from "@/hooks/useChats";
import { FullMessageType } from "@/types";
import React, { useRef, useState } from "react";
import MessageBox from "./MessageBox";

type Props = { initialMessages?: FullMessageType[] };

const ChatBody = ({ initialMessages }: Props) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { chatId } = useChat();

  return (
    <div className="flex-1 w-3/4 mx-auto">
      {messages!.map((message, i) => (
        <MessageBox
          isLast={i === messages!.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default ChatBody;
