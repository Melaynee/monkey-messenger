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
import { IoClose, IoTrash } from "react-icons/io5";
import AvatarComponent from "../Avatar";

interface DrawerProps {
  isOpen?: boolean;
  onClose: () => void;
  data: Chat & {
    users: User[];
  };
}

const ProfileDrawer: React.FC<DrawerProps> = (props) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
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
                        py-6
                        shadow-xl
                      "
                  >
                    <div className="px-4 sm:px-6">
                      <div
                        className="
                            flex
                            items-start
                            justify-end
                          "
                      >
                        <div
                          className="
                            ml-3
                            flex
                            h-7
                            items-center
                          "
                        >
                          <button
                            onClick={props.onClose}
                            type="button"
                            className="
                                rounded-md
                                bg-white
                                text-main
                                hover:text-hover
                                hover:bg-light
                                focus:outline-none
                                focus:ring-2
                                focus:ring-sky-500
                                focus:ring-offset-2
                                transition-all duration-300
                              "
                          >
                            <span className="sr-only">Close panel</span>
                            <IoClose size={24} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className="
                        relative mt-6
                        flex-1 px-4
                        sm:px-6
                      "
                    >
                      <div
                        className="
                          flex flex-col items-center
                        "
                      >
                        <div className="mb-2">
                          {props.data.isGroup ? (
                            // TODO AvatarGroup
                            /* <AvatarGroup users={props.data.users} /> */

                            <div>props.data</div>
                          ) : (
                            <AvatarComponent user={otherUser} />
                          )}
                        </div>
                        <div>{title}</div>
                        <div
                          className="
                            text-sm text-main
                          "
                        >
                          {statusText}
                        </div>
                        <div className="flex gap-10 my-8">
                          <div
                            onClick={() => setConfirmOpen(true)}
                            className="
                                flex
                                flex-col
                                gap-3
                                items-center
                                cursor-pointer
                                hover:opacity-75
                              "
                          >
                            <div
                              className="
                                  w-10
                                  h-10
                                  bg-neutral-100
                                  rounded-full
                                  flex
                                  items-center
                                  justify-center
                                  text-red-500
                                "
                            >
                              <IoTrash size={20} />
                            </div>
                            <div
                              className="
                                  text-sm
                                  font-light
                                  text-red-500
                                "
                            >
                              Delete
                            </div>
                          </div>
                        </div>
                        <div
                          className="
                              w-full
                              pb-5
                              pt-5
                              sm:px-0
                              sm:pt-0
                            "
                        >
                          <dl
                            className="
                                space-y-8
                                px-4
                                sm:space-y-6
                                sm:px-6
                              "
                          >
                            {props.data.isGroup && (
                              <div>
                                <dt
                                  className="
                                      text-sm
                                      font-medium
                                      text-hover
                                      sm:w-40
                                      sm:flex-shrink-0
                                    "
                                >
                                  Emails
                                </dt>
                                <dd
                                  className="
                                      mt-1
                                      text-sm
                                      text-dark
                                      sm:col-span-2
                                    "
                                >
                                  {props.data.users
                                    .map((user: User) => user.email)
                                    .join(", ")}
                                </dd>
                              </div>
                            )}
                            {!props.data.isGroup && (
                              <div>
                                <dt
                                  className="
                                      text-sm
                                      font-medium
                                      text-hover
                                      sm:w-40
                                      sm:flex-shrink-0
                                    "
                                >
                                  Email
                                </dt>
                                <dd
                                  className="
                                      mt-1
                                      text-sm
                                      text-dark
                                      sm:col-span-2
                                    "
                                >
                                  {otherUser.email}
                                </dd>
                              </div>
                            )}
                            {!props.data.isGroup && (
                              <>
                                <hr />
                                <div>
                                  <dt
                                    className="
                                        text-sm
                                        font-medium
                                        text-hover
                                        sm:w-40
                                        sm:flex-shrink-0
                                      "
                                  >
                                    Joined
                                  </dt>
                                  <dd
                                    className="
                                        mt-1
                                        text-sm
                                        text-dark
                                        sm:col-span-2
                                      "
                                  >
                                    <time dateTime={joinedDate}>
                                      {joinedDate}
                                    </time>
                                  </dd>
                                </div>
                              </>
                            )}
                          </dl>
                        </div>
                      </div>
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
