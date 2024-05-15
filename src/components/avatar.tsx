import Image from "next/image";
import React from "react";

type Props = {};

const AvatarComponent = (props: Props) => {
  return (
    <Image
      src={"/img/avatar.jpeg"}
      alt="avatar"
      width={40}
      height={40}
      className="rounded-full w-[40px] h-[40px]"
    />
  );
};

export default AvatarComponent;
