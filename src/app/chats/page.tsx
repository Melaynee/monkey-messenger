import WelcomeComponent from "@/components/organisms/welcome";
import React from "react";

type Props = {};

const ChatsPage = (props: Props) => {
  return (
    <div className="h-full">
      <WelcomeComponent />
    </div>
  );
};

export default ChatsPage;
