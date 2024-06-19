import { User } from "@prisma/client";
import React from "react";
import AvatarComponent from "./Avatar";
import UserItem from "./UserItem";
import { cn } from "@/lib/utils";

type Props = {
  user: User;
  handleClick?: (user: User) => void;
  showMessage?: boolean;
  selected?: boolean;
};

const UserBox: React.FC<Props> = ({
  user,
  handleClick,
  showMessage,
  selected,
}) => {
  return (
    <button
      className={cn(
        "flex gap-4 p-4 w-full hover:bg-light transition-all duration-300",
        selected && "bg-main hover:bg-hover"
      )}
      onClick={() => handleClick && handleClick(user)}
    >
      <AvatarComponent user={user} />
      <UserItem user={user} showMessage={!!showMessage} />
    </button>
  );
};

export default UserBox;
