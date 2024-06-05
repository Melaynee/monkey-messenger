import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";

type Props = { users: User[] };

const AvatarGroup = (props: Props) => {
  const slicedUsers = props.users.slice(0, 3);

  const positionMap = {
    0: "top-0 left-[10px]",
    1: "bottom-[10%]",
    2: "bottom-[10%] right-0",
  };
  return (
    <div className="relative h-10 w-10 rounded-full overflow-hidden">
      {slicedUsers.map((user, index) => {
        return (
          <div
            key={user.id}
            className={`absolute inline-block rounded-full overflow-hidden h-[21px] w-[21px] ${
              positionMap[index as keyof typeof positionMap]
            }`}
          >
            <Image
              fill
              src={user.image ?? "/img/avatar.jpeg"}
              alt="Group Avatar"
            />
          </div>
        );
      })}
    </div>
  );
};

export default AvatarGroup;
