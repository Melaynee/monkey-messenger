import { cn } from "@/lib/utils";
import { FullMessageType } from "@/types";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useCallback, useState } from "react";
import AvatarComponent from "../Avatar";
import { format } from "date-fns";
import Image from "next/image";
import ImageModal from "./ImageModal";
import { FaEye } from "react-icons/fa";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { MdDeleteOutline, MdModeEdit, MdReply } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import useReplyStore from "@/hooks/useReplyStore";
import useEditStore from "@/hooks/useEditStore";

type Props = {
  isLast?: boolean;
  data: FullMessageType;
};

const MessageBox = (props: Props) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setReplyMessage, clearReplyMessage } = useReplyStore();
  const { setEditMessage, clearEditMessage } = useEditStore();

  const isOwn = session?.data?.user?.email === props.data?.sender?.email;
  const seenList = (props.data?.seen || [])
    .filter((user: User) => user.email !== props.data?.sender?.email)
    .map((user: User) => user.name)
    .join(", ");

  const handleDelete = useCallback(() => {
    setIsLoading(true);
    axios
      .delete(`/api/messages/${props.data?.id}/delete`)
      .then(() => {})
      .catch(() => toast.error("Something went wrong"))
      .finally(() => {
        setIsLoading(false);
      });
  }, [props.data?.id]);

  const handleReply = useCallback(() => {
    if (!props.data) return;
    clearEditMessage();
    setReplyMessage(props.data);
  }, [props.data, setReplyMessage, clearEditMessage]);

  const handleEdit = useCallback(() => {
    if (!props.data) return;
    clearReplyMessage();
    setEditMessage(props.data);
  }, [props.data, setEditMessage, clearReplyMessage]);

  return (
    <div
      className={cn(
        "flex max-w-[60%] ",
        isOwn
          ? "ml-auto items-end justify-end"
          : "mr-auto items-start justify-start"
      )}
    >
      <ContextMenu>
        <ContextMenuTrigger className="flex gap-3 p-4">
          <div className={cn("min-w-fit", isOwn && "order-2")}>
            <AvatarComponent user={props.data.sender} />
          </div>
          <div className={cn("flex flex-col")}>
            {/* Name */}
            <div
              className={cn(
                "flex items-center justify-between gap-3 py-1 px-2",
                isOwn
                  ? "bg-main text-white rounded-tl-2xl "
                  : "bg-light text-dark rounded-tr-2xl "
              )}
            >
              <div className="text-sm">{props.data.sender.name}</div>
            </div>
            {/* Reply */}
            {props.data.replyTo && (
              <div
                className={cn(
                  "bg-white py-1 px-2 cursor-default select-none",
                  isOwn && "bg-light"
                )}
              >
                <div className="bg-scene/90 p-1 rounded-lg">
                  <div className="ml-2 pl-2 border-l-2 border-main overflow-hidden max-w-[80%] max-h-16">
                    <p className="font-medium text-sm ">
                      {props.data.replyTo.senderId}
                    </p>
                    <p className="text-ellipsis text-sm">
                      {props.data.replyTo?.image
                        ? "image"
                        : props.data.replyTo.body}
                    </p>
                  </div>
                </div>
              </div>
            )}
            {/* Message Text */}
            <div
              className={cn(
                "text-sm w-full overflow-hidden",
                isOwn
                  ? "bg-light text-dark rounded-bl-lg"
                  : "bg-white text-dark rounded-br-lg",
                props.data?.image ? " p-0" : " py-2 px-3"
              )}
            >
              <ImageModal
                src={props.data.image}
                isOpen={imageModalOpen}
                onClose={() => setImageModalOpen(false)}
              />
              {props.data?.image ? (
                <Image
                  onClick={() => setImageModalOpen(true)}
                  alt="Image"
                  height="288"
                  width="288"
                  src={props.data.image}
                  className="object-cover cursor-pointer hover:scale-110 transition translate"
                />
              ) : (
                <div className="">
                  {props.data?.body}
                  <span className="text-[10px] font-light translate-y-2 px-1 float-right ">
                    {props.data.isEdited ? "edited" : ""}{" "}
                    {format(new Date(props.data.createdAt), "H:mm")}
                  </span>
                </div>
              )}
            </div>
            {/* Seen */}
            {props.isLast && isOwn && seenList.length > 0 && (
              <div className="text-xs font-light text-dark flex gap-2 items-center justify-end ">
                <FaEye className="text-dark/60" />
                {seenList}
              </div>
            )}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="rounded-3xl opacity-80 px-2 py-4 backdrop-blur-lg">
          {isOwn && (
            <ContextMenuItem
              className="flex gap-2 cursor-pointer"
              onClick={handleEdit}
            >
              <MdModeEdit size={20} />
              Edit
            </ContextMenuItem>
          )}
          <ContextMenuItem
            className="flex gap-2 cursor-pointer"
            onClick={handleReply}
          >
            <MdReply size={20} />
            Reply
          </ContextMenuItem>
          <ContextMenuItem
            className="flex gap-2 font-medium text-red-500 cursor-pointer"
            onClick={handleDelete}
          >
            <MdDeleteOutline size={20} />
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
};

export default MessageBox;
