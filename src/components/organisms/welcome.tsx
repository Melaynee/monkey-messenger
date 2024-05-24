import React from "react";

type Props = {};

const WelcomeComponent = (props: Props) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full mx-auto bg-hover">
      <h1 className="text-3xl text-[#fff] font-bold">Welcome back!</h1>
      <p className="text-sm text-[#fff] font-light">
        Select a chat to start messaging
      </p>
    </div>
  );
};

export default WelcomeComponent;
