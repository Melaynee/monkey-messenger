"use client";
import WelcomeComponent from "@/components/organisms/welcome";
import React from "react";

type Props = {};

const Users = (props: Props) => {
  return (
    <div className="h-full">
      <WelcomeComponent />
    </div>
  );
};

export default Users;
