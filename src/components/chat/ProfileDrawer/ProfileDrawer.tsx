import useOtherUser from "@/hooks/useOtherUser";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Chat, User } from "@prisma/client";
import { format } from "date-fns";
import React, { Fragment, useMemo } from "react";
import ProfileDrawerHeader from "./ProfileDrawerHeader";
import ProfileDrawerAvatar from "./ProfileDrawerAvatar";
import ProfileDrawerInfo from "./ProfileDrawerInfo";

interface DrawerProps {
  isOpen?: boolean;
  onClose: () => void;
  data: Chat & {
    users: User[];
  };
  statusText?: string;
  currentUser: User | null;
}

const ProfileDrawer: React.FC<DrawerProps> = (props) => {
  const otherUser: User = useOtherUser(props.data);

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), "PP");
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return props.data.name ?? otherUser.name!;
  }, [props.data.name, otherUser.name]);

  return (
    <Transition show={props.isOpen} as={Fragment}>
      <Dialog onClose={props.onClose} as="div">
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-dark opacity-80 shadow-lg"></div>
        </TransitionChild>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel
                  className={"pointer-events-auto w-screen max-w-md"}
                >
                  <div className="grid grid-rows-12 grid-cols-1 h-full bg-white py-4 shadow-xl ">
                    <div className="row-span-1">
                      <ProfileDrawerHeader
                        onClose={props.onClose}
                        isGroup={props.data.isGroup ?? false}
                      />
                    </div>
                    <div className="overflow-hidden row-start-2 row-end-9">
                      <ProfileDrawerAvatar
                        chat={props.data}
                        user={otherUser}
                        statusText={props.statusText}
                        title={title}
                      />
                    </div>
                    <div className="overflow-y-auto h-full row-span-5">
                      <ProfileDrawerInfo
                        isGroup={props.data.isGroup ?? false}
                        user={otherUser}
                        users={props.data.users}
                        owner={props.data.owner}
                        joinedDate={joinedDate}
                        currentUser={props.currentUser}
                      />
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProfileDrawer;
