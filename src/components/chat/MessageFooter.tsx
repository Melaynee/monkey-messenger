"use client";

import React from "react";
import MessageForm from "./MessageForm";

type Props = {};

const MessageFooter = (props: Props) => {
  return (
    <div className="relative">
      <div className="fixed left-0 right-0 bottom-[2%]">
        <MessageForm onSubmit={() => {}} />
      </div>
    </div>
  );
};

export default MessageFooter;
