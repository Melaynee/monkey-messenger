"use client";
import useChat from "@/hooks/useChats";
import { FullMessageType } from "@/types";
import React, { useEffect, useRef, useState } from "react";
import MessageBox from "../MessageBox";
import axios from "axios";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";

type Props = { initialMessages?: FullMessageType[] };

const ChatBody = ({ initialMessages }: Props) => {
  const [messages, setMessages] = useState(initialMessages);
  const { chatId } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatId) axios.post(`/api/chats/${chatId}/seen`);
  }, [chatId]);

  useEffect(() => {
    pusherClient.subscribe(chatId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/chats/${chatId}/seen`);

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }
        return [...current!, message];
      });

      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current?.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }
          return currentMessage;
        })
      );
    };
    const deleteMessageHandler = (deletedMessageId: string) => {
      setMessages((current) =>
        current?.filter((message) => message.id !== deletedMessageId)
      );
    };

    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);
    pusherClient.bind("message:delete", deleteMessageHandler);

    return () => {
      pusherClient.unsubscribe(chatId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
      pusherClient.unbind("message:delete", deleteMessageHandler);
    };
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
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default ChatBody;
