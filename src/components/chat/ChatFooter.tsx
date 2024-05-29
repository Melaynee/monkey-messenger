"use client";

import React from "react";
import MessageForm from "./MessageForm";

type Props = {};

const ChatFooter = (props: Props) => {
  return (
    <div className="">
      <MessageForm onSubmit={() => {}} />
    </div>
  );
};

export default ChatFooter;
