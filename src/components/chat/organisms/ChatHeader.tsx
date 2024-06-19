"use client";
import { Chat, User } from "@prisma/client";
import AvatarComponent from "../../Avatar";
import UserItem from "../../UserItem";
import ChatDropdownMenu from "../ChatDropdownMenu";
import useOtherUser from "@/hooks/useOtherUser";
import { useCallback, useMemo, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import ProfileDrawer from "../ProfileDrawer/ProfileDrawer";
import AddContact from "../AddContact";
import { useRouter } from "next/navigation";
import AvatarGroup from "../GroupChat/AvatarGroup";
import useActiveList from "@/hooks/useActiveList";
import AddUserToGroupModal from "../GroupChat/AddUserToGroupModal";
import LeaveChatModal from "../LeaveChatModal";
import axios from "axios";
import toast from "react-hot-toast";
import { useLeavingModalStore } from "@/hooks/useModalStore";

interface Props {
  chat: Chat & {
    users: User[];
  };
  currentUser: User | null;
}

const Header = (props: Props) => {
  const otherUser = useOtherUser(props.chat);
  const [isDrawOpen, setIsDrawOpen] = useState(false);
  const { onClose: onLeavingClose } = useLeavingModalStore();

  const { members } = useActiveList();

  const isActive = otherUser && members.indexOf(otherUser.email!) !== -1;

  const router = useRouter();

  const statusText = useMemo(() => {
    if (props.chat.isGroup) {
      return `${props.chat.users.length} members`;
    }
    if (!isActive) return "Offline";

    return "Active";
  }, [props.chat, isActive]);

  const handleReturn = () => {
    router.push("/chats");
  };

  const onLeave = useCallback(() => {
    axios
      .post(`/api/chats/${props.chat.id}/kick`, {
        userId: props.currentUser?.id,
      })
      .then(() => {
        router.push("/chats");
        router.refresh();
      })
      .catch(() => toast.error("Something went wrong..."))
      .finally(() => {
        onLeavingClose();
      });
  }, [props.chat.id, router, onLeavingClose, props.currentUser?.id]);

  return (
    <>
      <AddUserToGroupModal />
      <LeaveChatModal handleClick={onLeave} />

      <AddContact data={otherUser} />
      <ProfileDrawer
        isOpen={isDrawOpen}
        onClose={() => setIsDrawOpen(false)}
        data={props.chat}
        statusText={statusText}
        currentUser={props.currentUser}
      />
      <div className="w-full flex gap-6 justify-start items-center px-2 md:px-4 lg:px-6 py-2 bg-main h-16 rounded-b-sm">
        <div
          className="flex lg:hidden items-center cursor-pointer text-white hover:text-hover hover:bg-light/10 rounded-full transition-colors duration-300"
          onClick={handleReturn}
        >
          <BiChevronLeft size={40} />
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-2" onClick={() => setIsDrawOpen(true)}>
            {props.chat.isGroup ? (
              <AvatarGroup users={props.chat.users} />
            ) : (
              <AvatarComponent user={otherUser} />
            )}

            <UserItem
              user={otherUser}
              chatName={props?.chat.name}
              statusText={statusText}
              isOnPanel
            />
          </div>
          <div className="flex">
            <div className="">
              <ChatDropdownMenu isGroup={props.chat.isGroup ?? false} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
