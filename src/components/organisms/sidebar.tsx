import BurgerComponent from "@/components/Burger";
import Searchbar from "@/components/Searchbar";
import ItemComponent from "@/components/SidebarItem";
import React from "react";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className="bg-[#fff]  h-full min-h-screen py-4">
      <div className="flex items-center justify-around mb-4">
        <BurgerComponent />
        <Searchbar />
      </div>
      <div className="flex flex-col justify-around items-start">
        <ItemComponent />
        <ItemComponent />
        <ItemComponent />
        <ItemComponent />
      </div>
    </div>
  );
};

export default Sidebar;
