import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import React from "react";

type Props = { user?: User; showMessage?: boolean };

const UserItem = (props: Props) => {
  return (
    <div className="">
      <h6
        className={cn(
          "text-base tracking-wide text-dark",
          props.showMessage ? "text-dark" : "text-[#fff]"
        )}
      >
        {props.user?.name ?? "username"}
      </h6>
      {props.showMessage ? (
        <p className="text-sm text font-light text-light">Message</p>
      ) : (
        <p className="text-sm text font-light text-[#fff]/80">
          Last seen recently
        </p>
      )}
    </div>
  );
};

export default UserItem;
