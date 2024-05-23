"use client";
import Sidebar from "@/components/organisms/sidebar";
import WelcomeComponent from "@/components/organisms/welcome";
import React from "react";

type Props = {};

const Users = (props: Props) => {
  return (
    <div>
      <div className="flex">
        <Sidebar />
        <WelcomeComponent />
      </div>
    </div>
  );
};

export default Users;
