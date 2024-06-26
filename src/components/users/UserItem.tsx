import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import React from "react";

type Props = {
  user?: User;
  selected?: boolean;
  showMessage?: boolean;
  isOnPanel?: boolean;
  statusText?: string;
  chatName?: string | null;
};

const UserItem = (props: Props) => {
  return (
    <div className={cn("flex flex-col items-start justify-center")}>
      <h6
        className={cn(
          "text-base tracking-wide tеxt-dark cursor-pointer",
          props.isOnPanel && "text-white",
          props.selected && "text-white"
        )}
      >
        {props?.chatName ?? props.user?.name}
      </h6>
      {props.showMessage && (
        <p className="text-sm text font-light text-dark">Message</p>
      )}
      {props.isOnPanel && (
        <p className="text-sm text font-light text-[#fff]/80">
          {props.statusText ?? "Last seen recently"}
        </p>
      )}
    </div>
  );
};

export default UserItem;
