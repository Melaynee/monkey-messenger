import useOtherUser from "@/hooks/useOtherUser";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Chat, User } from "@prisma/client";
import { format } from "date-fns";
import React, { Fragment, useMemo, useState } from "react";
import AddContact from "../AddContact";
import ProfileDrawerHeader from "./ProfileDrawerHeader";
import ProfileDrawerAvatar from "./ProfileDrawerAvatar";
import ProfileDrawerInfo from "./ProfileDrawerInfo";

interface DrawerProps {
  isOpen?: boolean;
  onClose: () => void;
  data: Chat & {
    users: User[];
  };
}

const ProfileDrawer: React.FC<DrawerProps> = (props) => {
  const [isAddContactsOpen, setIsAddContactsOpen] = useState<boolean>(false);
  const otherUser = useOtherUser(props.data);

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), "PP");
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return props.data.name ?? otherUser.name;
  }, [props.data.name, otherUser.name]);

  const statusText = useMemo(() => {
    if (props.data.isGroup) {
      return `${props.data.users.length} members.`;
    }
    // TODO implement status
    return "Active";
  }, [props.data.isGroup, props.data.users]);

  return (
    <>
      <AddContact
        data={otherUser}
        isOpen={isAddContactsOpen}
        onClose={() => setIsAddContactsOpen(false)}
      />
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
                    <div
                      className="
                        flex
                        h-full
                        flex-col
                        overflow-y-scroll
                        bg-white
                        py-4
                        shadow-xl
                      "
                    >
                      <ProfileDrawerHeader
                        onClose={props.onClose}
                        isGroup={props.data.isGroup ?? false}
                        setIsAddContactsOpen={() => setIsAddContactsOpen(true)}
                      />
                      <ProfileDrawerAvatar chat={props.data} user={otherUser} />
                      <ProfileDrawerInfo
                        isGroup={props.data.isGroup ?? false}
                        user={otherUser}
                      />
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ProfileDrawer;
