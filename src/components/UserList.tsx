import React from "react";
import AvatarComponent from "./Avatar";
import UserItem from "./UserItem";
import Link from "next/link";
import { User } from "@prisma/client";

type Props = { users: User[] };

const UserList = async (props: Props) => {
  console.log(props.users);
  return (
    <div className="my-1 w-full">
      {
        /* map users here */
        props.users.map((user) => (
          <Link
            key={user.id}
            href={"/chat/" + user.id}
            className="flex gap-4 p-4 hover:bg-hover/10 transition-all duration-300"
          >
            <AvatarComponent user={user} />
            <UserItem user={user} />
          </Link>
        ))
      }
    </div>
  );
};

export default UserList;
