import getChats from "@/actions/getChats";
import getCurrentUser from "@/actions/getCurrentUser";
import getUsers from "@/actions/getUsers";
import React from "react";
import Footer from "./organisms/footer";
import SwitchList from "./SwitchList";

type Props = {};

const EmpyState = async (props: Props) => {
  const chats = await getChats();
  const users = await getUsers();
  const currentUser = await getCurrentUser();

  return (
    <>
      <div className="hidden lg:block h-full">
        <div className="flex flex-col justify-center items-center h-full w-full mx-auto bg-hover">
          <h1 className="text-3xl text-[#fff] font-bold">Welcome back!</h1>
          <p className="text-sm text-[#fff] font-light">
            Select a chat to start messaging
          </p>
        </div>
      </div>
      {users && (
        <div className="flex flex-col justify-between h-full lg:hidden relative ">
          <SwitchList users={users} chats={chats} />
          <div className="fixed bottom-0 left-0 right-0 block lg:hidden">
            <Footer currentUser={currentUser!} />
          </div>
        </div>
      )}
    </>
  );
};

export default EmpyState;
