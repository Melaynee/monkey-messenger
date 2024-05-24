import BurgerComponent from "@/components/Burger";
import Searchbar from "@/components/Searchbar";
import React from "react";
import { User } from "@prisma/client";
import UserList from "../UserList";
import getUsers from "@/actions/getUsers";

type Props = { currentUser: User };

const Sidebar = async (props: Props) => {
  const users = await getUsers();

  return (
    <div className="bg-[#fff] h-full min-h-screen py-4">
      <div className="flex items-center justify-around mb-4">
        <BurgerComponent currentUser={props.currentUser} />
        <Searchbar />
      </div>

      <div className="flex flex-col justify-around items-start">
        <UserList users={users} />
      </div>
    </div>
  );
};

export default Sidebar;
