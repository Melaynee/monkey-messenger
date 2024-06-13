"use client";

import React from "react";
import MessageForm from "../MessageInput";
import useChat from "@/hooks/useChats";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { HiPhoto } from "react-icons/hi2";
import { CldUploadButton } from "next-cloudinary";
import ReplyComponent from "../ReplyComponent";
import useReplyStore from "@/hooks/useReplyStore";
import { cn } from "@/lib/utils";
import { BiSend } from "react-icons/bi";
import useEditStore from "@/hooks/useEditStore";
import EditComponent from "../EditComponent";
type Props = {};

const ChatFooter = (props: Props) => {
  const { chatId } = useChat();
  const { replyMessage, clearReplyMessage } = useReplyStore();
  const { editMessage, clearEditMessage } = useEditStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    if (editMessage) {
      axios.put(`/api/messages/put`, {
        ...data,
        chatId,
      });
    }

    axios
      .post("/api/messages", {
        ...data,
        chatId,
        replyMessage,
      })
      .finally(() => {
        clearReplyMessage();
      });
  };

  const handleUpload = (result: any) => {
    axios
      .post("/api/messages", {
        image: result?.info?.secure_url,
        chatId,
        replyMessage,
      })
      .finally(() => clearReplyMessage());
  };

  return (
    <div className="flex flex-col w-3/4 mx-auto">
      {replyMessage && <ReplyComponent />}
      {editMessage && <EditComponent />}
      <div className="flex items-center justify-between">
        <CldUploadButton
          options={{ maxFiles: 1 }}
          onSuccess={handleUpload}
          uploadPreset="xomlbhyy"
          className={cn(
            "bg-white border-r-2 border-scene p-2 rounded-full rounded-r-none",
            replyMessage && "rounded-none rounded-bl-lg border-white",
            editMessage && "rounded-none rounded-bl-lg border-white"
          )}
        >
          <HiPhoto size={26} className="text-sky-500" />
        </CldUploadButton>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center gap-2 lg:gap-4 w-full"
        >
          <MessageForm
            id="message"
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            required
            replyMessage={!!replyMessage}
            placeholder={"Type your message here..."}
          />
          <button
            type="submit"
            className="p-2 flex items-center border border-light rounded-full bg-main hover:bg-hover text-white transition-colors duration-300 -rotate-90"
          >
            <BiSend size={22} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatFooter;
