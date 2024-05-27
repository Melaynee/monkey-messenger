import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { HiDotsVertical } from "react-icons/hi";
import { RiContactsBookLine } from "react-icons/ri";
import { MdBlock, MdDeleteOutline, MdOutlineVideoCall } from "react-icons/md";
import { IoVolumeMuteOutline } from "react-icons/io5";
import { BiSelectMultiple } from "react-icons/bi";

type Props = {};

const ChatDropdownMenu = (props: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none flex items-center">
        <HiDotsVertical className="text-[#fff]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="opacity-90 -translate-x-5 translate-y-5">
        <DropdownMenuItem className="flex gap-2 cursor-pointer">
          <RiContactsBookLine size={20} /> Add to contacts
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-2 cursor-pointer">
          <MdOutlineVideoCall size={20} /> Video Call{" "}
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-2 cursor-pointer">
          <IoVolumeMuteOutline size={20} />
          Mute...{" "}
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-2 cursor-pointer">
          <BiSelectMultiple size={20} />
          Select messages{" "}
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-2 cursor-pointer">
          <MdBlock size={20} />
          Block user{" "}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex gap-2 text-red-600 hover:text-red-400 cursor-pointer transition-colors duration-300">
          <MdDeleteOutline size={20} /> Delete chat{" "}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChatDropdownMenu;
