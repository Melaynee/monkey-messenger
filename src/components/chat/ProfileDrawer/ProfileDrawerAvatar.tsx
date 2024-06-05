import { Chat, User } from "@prisma/client";
import Image from "next/image";
import React from "react";

type Props = {
  user: User;
  chat?: Chat & {
    users: User[];
  };
};

const ProfileDrawerAvatar = (props: Props) => {
  const imageSrc = props.user?.image ?? "/img/avatar.jpeg";

  return (
    <div className="relative">
      <Image
        src={imageSrc}
        width={400}
        height={400}
        alt="avatar"
        className="w-full h-full"
      />
      <div className="absolute bottom-0 left-0 right-0 min-h-40 bg-gradient-to-b from-transparent to-dark">
        <div className="absolute bottom-5 translate-x-4 text-white">
          <div className="text-2xl font-medium">
            {props.chat?.name ?? props.user.name}
          </div>
          <div className="text-xl font-light">status</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDrawerAvatar;
