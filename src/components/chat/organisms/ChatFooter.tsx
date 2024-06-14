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
      console.log(editMessage);
      axios
        .put(`/api/messages/put`, {
          ...data,
          chatId,
        })
        .finally(() => clearEditMessage());
      return;
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
      <div className="flex items-center justify-between">
        <CldUploadButton
          options={{ maxFiles: 1 }}
          onSuccess={handleUpload}
          uploadPreset="xomlbhyy"
          className={cn(
            "bg-white border-r-2 border-scene p-2 rounded-full rounded-r-none h-full",
            replyMessage && "rounded-none rounded-bl-lg border-white",
            editMessage && "rounded-none rounded-bl-lg border-white"
          )}
        >
          <HiPhoto size={32} className="text-sky-500" />
        </CldUploadButton>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center gap-2 lg:gap-4 w-full"
        >
          <div
            className={cn(
              "w-full grid grid-cols-6 ",
              (replyMessage || editMessage) && " grid-rows-2 "
            )}
          >
            {(replyMessage || editMessage) && (
              <div className={cn("col-span-5 row-span-1 content-stretch")}>
                {replyMessage && <ReplyComponent />}
                {editMessage && <EditComponent />}
              </div>
            )}
            <div
              className={cn(
                "col-start-1 col-span-5 content-stretch",
                (replyMessage || editMessage) && "col-span-5 row-span-2"
              )}
            >
              <MessageForm
                id="message"
                onSubmit={handleSubmit(onSubmit)}
                register={register}
                errors={errors}
                required
                replyMessage={!!replyMessage}
                editMessage={editMessage}
                placeholder={"Type your message here..."}
              />
            </div>
            <div
              className={cn(
                "col-start-6 justify-self-center self-center content-center ",
                (replyMessage || editMessage) && "col-start-6 row-span-2"
              )}
            >
              <button
                type="submit"
                className="p-2 flex items-center border border-light rounded-full bg-main hover:bg-hover text-white transition-colors duration-300 -rotate-90"
              >
                <BiSend size={32} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatFooter;
