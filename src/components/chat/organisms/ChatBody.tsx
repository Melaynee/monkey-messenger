"use client";
import useChat from "@/hooks/useChats";
import {
  DeleteMessageRepliesType,
  DeleteMessageType,
  FullMessageType,
} from "@/types";
import React, { useEffect, useRef, useState } from "react";
import MessageBox from "../MessageBox";
import axios from "axios";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";
import toast from "react-hot-toast";

type Props = { initialMessages?: FullMessageType[] };

const ChatBody = ({ initialMessages }: Props) => {
  const [messages, setMessages] = useState(initialMessages);
  const { chatId } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatId)
      axios.post(`/api/chats/${chatId}/seen`).catch((err) => {
        console.log("USE_EFFECT_SEEN_ERR", err);
        return toast.error("Something went wrong");
      });
  }, [chatId]);

  useEffect(() => {
    const messageHandler = (message: FullMessageType) => {
      setMessages((current) => {
        if (find(current, { id: message.id })) return current;
        return [...current!, message];
      });
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      const mappedMessages = (message: FullMessageType) =>
        message.id === newMessage.id ? newMessage : message;
      setMessages((current) => current?.map(mappedMessages));
    };

    const updateMessageRepliesHandler = (
      newMessage: DeleteMessageRepliesType
    ) => {
      const mappedMessages = (message: FullMessageType) =>
        message.id === newMessage.id
          ? { ...message, replyToId: newMessage.replyToId }
          : message;
      setMessages((currentMessages) => {
        const updatedMessages = currentMessages?.map(mappedMessages);
        return updatedMessages;
      });
    };

    const deleteMessageHandler = (newMessage: DeleteMessageType) => {
      const filteredMessages = (message: DeleteMessageType) =>
        message.id !== newMessage.id;
      setMessages((current) => current?.filter(filteredMessages));
    };

    const handlers = {
      "messages:new": messageHandler,
      "message:update": updateMessageHandler,
      "message:delete": deleteMessageHandler,
      "message:edit": updateMessageHandler,
      "message:update-replies": updateMessageRepliesHandler,
    };

    Object.entries(handlers).forEach(([event, handler]) => {
      pusherClient.bind(event, handler);
    });

    pusherClient.subscribe(chatId);
    bottomRef?.current?.scrollIntoView();

    return () => {
      pusherClient.unsubscribe(chatId);
      Object.entries(handlers).forEach(([event, handler]) => {
        pusherClient.unbind(event, handler);
      });
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
      <div ref={bottomRef} className="pt-8" />
    </div>
  );
};

export default ChatBody;
