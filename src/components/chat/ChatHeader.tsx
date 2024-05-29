"use client";
import { Chat, User } from "@prisma/client";
import AvatarComponent from "../Avatar";
import UserItem from "../UserItem";
import ChatDropdownMenu from "./ChatDropdownMenu";
import useOtherUser from "@/hooks/useOtherUser";
import { useMemo } from "react";
import { BiChevronLeft } from "react-icons/bi";

interface Props {
  chat: Chat & {
    users: User[];
  };
}

const Header = (props: Props) => {
  const otherUser = useOtherUser(props.chat);

  const statusText = useMemo(() => {
    if (props.chat.isGroup) {
      return `${props.chat.users.length} members`;
    }

    return "Active";
  }, [props.chat]);

  return (
    <div className="w-full flex gap-6 justify-start items-center px-2 md:px-4 lg:px-6 py-2 bg-main h-16 rounded-b-sm">
      {/* TODO return into chat page */}
      <div className="flex lg:hidden items-center cursor-pointer text-white hover:text-hover hover:bg-light/10 rounded-full transition-colors duration-300">
        <BiChevronLeft size={40} />
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="flex gap-2">
          <AvatarComponent user={otherUser} />
          <UserItem
            user={otherUser}
            chatName={props?.chat.name}
            statusText={statusText}
            isOnPanel
          />
        </div>
        <div className="flex">
          <div className="">
            <ChatDropdownMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
