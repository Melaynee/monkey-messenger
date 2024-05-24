import { User } from "@prisma/client";
import React from "react";

type Props = { user: User };

const UserItem = (props: Props) => {
  return (
    <div className="">
      <h6 className="text-base tracking-wide text-dark">{props.user.name}</h6>
      <p className="text-sm text font-light text-light">Message</p>
    </div>
  );
};

export default UserItem;
