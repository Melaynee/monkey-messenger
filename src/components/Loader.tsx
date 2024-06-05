"use client";
import React, { Fragment } from "react";
import { ClipLoader } from "react-spinners";
import { Transition, TransitionChild } from "@headlessui/react";

type Props = {};

const Loader = (props: Props) => {
  return (
    <Transition show as={Fragment}>
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
              bg-gray-100
              bg-opacity-50
              transition-opacity
            "
        />
      </TransitionChild>
      <div
        className="
          fixed
          inset-0
          z-10
          overflow-y-auto
        "
      >
        <div
          className="
          flex
          min-h-full
          items-center
          justify-center
          p-4
          text-center
        "
        >
          <ClipLoader size={40} color="#0284c7" />
        </div>
      </div>
    </Transition>
  );
};

export default Loader;
