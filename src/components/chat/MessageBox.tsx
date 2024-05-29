import { cn } from "@/lib/utils";
import { FullMessageType } from "@/types";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import AvatarComponent from "../Avatar";
import { format } from "date-fns";
import Image from "next/image";
import ImageModal from "./ImageModal";

type Props = {
  isLast?: boolean;
  data?: FullMessageType;
};

const MessageBox = (props: Props) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const isOwn = session?.data?.user?.email === props.data?.sender?.email;
  const seenList = (props.data!.seen ?? [])
    .filter((user: User) => user.email !== props.data?.sender?.email)
    .map((user: User) => user.name)
    .join(", ");

  return (
    <div className={cn("flex gap-3 p-4", isOwn && "items-end")}>
      <div className={cn(isOwn && "order-2")}>
        <AvatarComponent user={props.data!.sender} />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <div className="text-sm text-light">{props.data!.sender.name}</div>
          <div className="text-xs text-light">
            {format(new Date(props.data!.createdAt), "H:m")}
          </div>
        </div>
        <div
          className={cn(
            "text-sm w-fit overflow-hidden",
            isOwn ? "bg-main text-white" : "bg-neutral",
            props.data?.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
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
          <div className="text-xs font-light text-light">{`Seen by ${seenList}`}</div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
