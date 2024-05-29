import getChatById from "@/actions/getChatById";
import getMessages from "@/actions/getMessages";
import EmpyState from "@/components/chat/EmpyState";
import ChatFooter from "@/components/chat/ChatFooter";
import ChatHeader from "@/components/chat/ChatHeader";
import React from "react";

interface IParams {
  chatId: string;
}
type Props = {};

const ChatPage = async ({ params }: { params: IParams }) => {
  const chat = await getChatById(params.chatId);
  const messages = await getMessages(params.chatId);

  if (!chat) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmpyState />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-2 pb-5 bg-scene ">
      <ChatHeader chat={chat} />
      <div className="w-full h-full overflow-y-auto">
        <div className="flex-1 w-3/4 mx-auto ">
          <div className="bg-neutral"></div>
        </div>
      </div>
      <ChatFooter />
    </div>
  );
};

export default ChatPage;