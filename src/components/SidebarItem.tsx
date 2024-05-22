import React from "react";
import AvatarComponent from "./Avatar";
import UserItem from "./UserItem";
import Link from "next/link";

type Props = {};

const ItemComponent = (props: Props) => {
  return (
    <div className="p-2 my-1 lg:px-4 w-full hover:bg-hover/10 transition-all duration-300">
      <Link href="/chat/123" className="flex gap-4">
        <AvatarComponent />
        <UserItem />
      </Link>
    </div>
  );
};

export default ItemComponent;
