import React from "react";
import { User } from "@prisma/client";
import BurgerComponent from "../ui/burger";
import Searchbar from "../Searchbar";

type Props = { currentUser: User; children: React.ReactNode };

const Sidebar = (props: Props) => {
  return (
    <div className="bg-[#fff] h-full min-h-screen py-4">
      <div className="flex items-center justify-around mb-4">
        <BurgerComponent currentUser={props.currentUser} />
        <Searchbar />
      </div>

      <div className="flex flex-col justify-around items-start">
        {props.children}
      </div>
    </div>
  );
};

export default Sidebar;
