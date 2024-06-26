"use client";
import React, { useCallback, useState } from "react";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import UserBox from "./UserBox";
import useSearchStore from "@/hooks/useSearchStore";
import { includes } from "lodash";
import { Loader } from "lucide-react";

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
        .then((res) => router.push(`/chats/${res.data.id}`))
        .finally(() => setIsLoading(false));
    },
    [router]
  );
  const { searchQuery } = useSearchStore();

  const filteredUsers = props.users.filter((user: User) =>
    includes(user.name?.toLowerCase(), searchQuery.toLowerCase())
  );

  return (
    <>
      {isLoading && <Loader />}
      <aside className="my-1 w-full">
        <div className="flex justify-between mb-4 px-5">
          <div className="text-2xl font-bold text-dark">Users</div>
        </div>
        {filteredUsers.map((user) => (
          <UserBox key={user.id} user={user} handleClick={handleClick} />
        ))}
      </aside>
    </>
  );
};

export default UserList;
