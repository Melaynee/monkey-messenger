import { Message } from "@prisma/client";
import React from "react";

type Props = { messages?: Message[] };

const ChatBody = (props: Props) => {
  return <div className="flex-1 w-3/4 mx-auto"></div>;
};

export default ChatBody;
