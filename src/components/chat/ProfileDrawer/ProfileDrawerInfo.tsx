import { User } from "@prisma/client";
import { format } from "date-fns";
import React, { useCallback, useState } from "react";
import {
  MdDateRange,
  MdDeleteOutline,
  MdOutlineMailOutline,
} from "react-icons/md";
import Button from "../../buttons/Button";
import Modal from "../../Modal";
import axios from "axios";
import RemoveChatModal from "../RemoveChatModal";
import useChat from "@/hooks/useChats";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  user: User;
  isGroup?: boolean;
};

const ProfileDrawerInfo = (props: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { chatId } = useChat();
  const router = useRouter();

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
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <RemoveChatModal
            handleClick={onDelete}
            onClose={() => setIsOpenModal(false)}
          />
        </Modal>
      )}
      <div className="relative h-full  w-full">
        {!props.isGroup && (
          <div className="py-2 px-3 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <MdOutlineMailOutline size={32} className="text-dark/80" />
              <div className="flex flex-col">
                {props.user.email}
                <p className="text-dark/80 text-sm">Email</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MdDateRange size={32} className="text-dark/80" />
              <div className="flex flex-col">
                {format(new Date(props.user.createdAt), "PP")}
                <p className="text-dark/80 text-sm">Joined</p>
              </div>
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-5 right-5">
          <Button
            type="button"
            onClick={() => setIsOpenModal(true)}
            danger
            fullWidth
          >
            <div className="flex items-center justify-center gap-3 ">
              <MdDeleteOutline size={32} className="" />
              Delete Chat
            </div>
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProfileDrawerInfo;
