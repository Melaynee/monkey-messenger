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

type Props = {
  isLast?: boolean;
  data?: FullMessageType;
};

const MessageBox = (props: Props) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setReplyMessage } = useReplyStore();

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
    setReplyMessage(props.data);
  }, [props.data, setReplyMessage]);

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
            <AvatarComponent user={props.data!.sender} />
          </div>
          <div className={cn("flex flex-col")}>
            <div
              className={cn(
                "flex items-center justify-between gap-3 py-1 px-2",
                isOwn
                  ? "bg-main text-white rounded-tl-2xl "
                  : "bg-light text-dark rounded-tr-2xl "
              )}
            >
              <div className="text-sm">{props.data!.sender.name}</div>
              <div className="text-xs">
                {format(new Date(props.data!.createdAt), "H:m")}
              </div>
            </div>
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
                src={props.data!.image}
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
                <div>{props.data?.body}</div>
              )}
            </div>
            {props.isLast && isOwn && seenList.length > 0 && (
              <div className="text-xs font-light text-dark flex gap-2 items-center justify-end ">
                <FaEye className="text-dark/60" />
                {seenList}
              </div>
            )}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="rounded-3xl opacity-80 px-2 py-4 backdrop-blur-lg">
          <ContextMenuItem className="flex gap-2 cursor-pointer">
            <MdModeEdit size={20} />
            Edit
          </ContextMenuItem>
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
