import MessageFooter from "@/components/MessageFooter";
import UserPanel from "@/components/UserPanel";
import React from "react";

type Props = { children: React.ReactNode };

const ChatPageLayout = (props: Props) => {
  return (
    <main>
      <div className="relative">
        <div className="fixed top-0 left-0 right-0">
          <UserPanel />
        </div>
      </div>
      {props.children}
      <div className="mx-auto">
        <MessageFooter />
      </div>
    </main>
  );
};

export default ChatPageLayout;
