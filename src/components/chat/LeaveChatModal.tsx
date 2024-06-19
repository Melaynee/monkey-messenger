import React from "react";
import Button from "../buttons/Button";
import { IoWarningOutline } from "react-icons/io5";
import Modal from "../Modal";
import { useLeavingModalStore } from "@/hooks/useModalStore";

type Props = {
  handleClick: () => void;
};

const LeaveChatModal = (props: Props) => {
  const { isOpen, onClose } = useLeavingModalStore();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex items-center gap-3">
        <div className="bg-red-100 rounded-full p-2">
          <IoWarningOutline size={32} className="text-red-500" />
        </div>
        <h2 className="text-xl font-bold tracking-wider">Leave from chat</h2>
      </div>
      <p className="py-2">
        Are you <span className="font-semibold">sure</span> about leaving from
        chat? This action is{" "}
        <span className="font-bold italic">irreversible</span>.
      </p>
      <div className="flex gap-2 justify-end">
        <Button type="button" secondary onClick={onClose}>
          No
        </Button>
        <Button type="button" danger onClick={props.handleClick}>
          I am sure!
        </Button>
      </div>
    </Modal>
  );
};

export default LeaveChatModal;
