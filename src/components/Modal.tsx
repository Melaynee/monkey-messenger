import React, { ReactNode, Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";

type Props = { children: ReactNode; onClose: () => void; isOpen?: boolean };

const Modal = (props: Props) => {
  return (
    <Transition show={props.isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={props.onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="
              fixed
              inset-0
              bg-dark
              bg-opacity-95
              transition-opacity
            "
          />
        </TransitionChild>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div
            className="
              flex
              min-h-full
              items-center
              justify-center
              p-4
              text-center
              sm:p-0
            "
          >
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                className="
                  relative
                  transform
                  overflow-hidden
                  rounded-lg
                  bg-white
                  px-4
                  pb-4
                  text-left
                  shadow-xl
                  transition-all
                  w-full
                  sm:my-8
                  sm:w-full
                  sm:max-w-lg
                  sm:p-6
                "
              >
                {props.children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
