"use client";
import React, { useCallback, useState } from "react";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import UserBox from "./UserBox";

type Props = { users: User[] };

const UserList = (props: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = useCallback(
    (user: User) => {
      setIsLoading(true);
      axios
        .post("/api/chats", {
          userId: user.id,
        })
        .then((res) => router.push(`/chat/${res.data.id}`))
        .finally(() => setIsLoading(false));
    },
    [router]
  );
  return (
    <div className="my-1 w-full">
      {props.users.map((user) => (
        <UserBox key={user.id} user={user} handleClick={handleClick} />
      ))}
    </div>
  );
};

export default UserList;
