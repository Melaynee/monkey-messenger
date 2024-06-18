import React, { useCallback, useState } from "react";
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
import { cn } from "@/lib/utils";
import axios from "axios";
import useChat from "@/hooks/useChats";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Modal from "../Modal";
import RemoveChatModal from "./RemoveChatModal";

type Props = {
  setIsAddContactsOpen: () => void;
  isGroup?: boolean;
};

const ChatDropdownMenu = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const router = useRouter();

  const { chatId } = useChat();
  const onDelete = useCallback(() => {
    setIsLoading(true);
    axios
      .delete(`/api/chats/${chatId}`)
      .then(() => {
        setIsOpenModal(false);
        router.push("/chats");
        router.refresh();
      })
      .catch(() => toast.error("Something went wrong..."))
      .finally(() => setIsLoading(false));
  }, [chatId, router]);
  return (
    <>
      {
        {
          /* TODO state management */
        }
      }
      <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <RemoveChatModal
          onClose={() => setIsOpenModal(false)}
          handleClick={onDelete}
        ></RemoveChatModal>
      </Modal>

      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none flex items-center">
          <HiDotsVertical size={20} className="text-[#fff]" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="opacity-90 -translate-x-5 translate-y-5">
          <DropdownMenuItem
            className={cn(
              "flex gap-2 cursor-pointer",
              props.isGroup && "hidden"
            )}
            onClick={props.setIsAddContactsOpen}
          >
            <RiContactsBookLine size={20} /> Add contact
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
            {!props.isGroup ? "Block user" : "Block group"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {!props.isGroup && (
            <DropdownMenuItem
              className="flex gap-2 text-red-600 hover:text-red-400 cursor-pointer transition-colors duration-300"
              onClick={() => setIsOpenModal(true)}
            >
              <MdDeleteOutline size={20} /> Delete chat{" "}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ChatDropdownMenu;
