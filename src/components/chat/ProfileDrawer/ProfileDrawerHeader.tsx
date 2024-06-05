import React from "react";
import { IoClose } from "react-icons/io5";
import { RiContactsBookLine } from "react-icons/ri";

type Props = {
  onClose: () => void;
  setIsAddContactsOpen: () => void;
  isGroup?: boolean;
};

const ProfileDrawerHeader = (props: Props) => {
  return (
    <div className="flex items-center justify-between px-2 pb-4">
      <div className="flex items-center gap-3">
        <div
          className="rounded-full cursor-pointer hover:bg-light text-dark/70 transition-colors duration-300"
          onClick={props.onClose}
        >
          <IoClose size={32} />
        </div>
        <h3 className="text-xl text-dark font-medium">
          {props.isGroup ? "Group Info" : "User Info"}
        </h3>
      </div>
      {!props.isGroup && (
        <button
          className="rounded-full cursor-pointer hover:bg-light text-dark/70 transition-colors duration-300"
          onClick={props.setIsAddContactsOpen}
        >
          <RiContactsBookLine size={26} />
        </button>
      )}
    </div>
  );
};

export default ProfileDrawerHeader;
