import useReplyStore from "@/hooks/useReplyStore";
import React from "react";
import { MdReply } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

type Props = {};

const ReplyComponent = (props: Props) => {
  const { replyMessage, clearReplyMessage } = useReplyStore();
  const handleClearReply = () => {
    clearReplyMessage();
  };
  return (
    <div className="bg-white py-2 h-full rounded-tr-lg relative">
      <div className="flex gap-3 max-h-[9vh] text-ellipsis overflow-hidden ">
        <div className="border-r-2 px-2 border-scene">
          <MdReply size={26} className="text-main" />
        </div>
        <div className="bg-light w-full py-1 px-3">
          <p className="text-main/80  overflow-hidden text-ellipsis w-[80%] text-nowrap md:w-full text-xs sm:text-sm font-medium">
            Replying to{" "}
            <span className="italic text-xs sm:text-sm">
              {replyMessage?.sender.name}
            </span>
          </p>
          <p className="text-dark font-light">{replyMessage?.body}</p>
        </div>
      </div>
      <div
        className="absolute right-3 bottom-1/3 cursor-pointer hover:bg-light rounded-full p-2"
        onClick={handleClearReply}
      >
        <IoMdClose size={20} className="m-auto" />
      </div>
    </div>
  );
};

export default ReplyComponent;
