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
    <div className="bg-white py-2 rounded-tl-lg max-h-[10vh] text-ellipsis overflow-hidden relative">
      <div className="flex gap-3">
        <div className="border-r-2 px-2 border-scene">
          <MdReply size={26} className="text-main" />
        </div>
        <div className="">
          <p className="text-main/80 text-sm font-medium">
            Replying to{" "}
            <span className="italic">{replyMessage?.sender.name}</span>
          </p>
          <p className="text-dark font-light">{replyMessage?.body}</p>
        </div>
      </div>
      <div
        className="absolute right-3 top-1/4 cursor-pointer hover:bg-light rounded-full p-2"
        onClick={handleClearReply}
      >
        <IoMdClose size={24} />
      </div>
    </div>
  );
};

export default ReplyComponent;
