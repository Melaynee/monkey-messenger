import { User } from "@prisma/client";
import { format } from "date-fns";
import React from "react";
import {
  MdDateRange,
  MdDeleteOutline,
  MdOutlineMailOutline,
} from "react-icons/md";
import Button from "../buttons/Button";

type Props = {
  user: User;
};

const ProfileDrawerInfo = (props: Props) => {
  return (
    <div className="relative h-full  w-full">
      <div className="py-2 px-3 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <MdOutlineMailOutline size={32} className="text-dark/80" />
          <div className="flex flex-col">
            {props.user.email}
            <p className="text-dark/80 text-sm">Email</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <MdDateRange size={32} className="text-dark/80" />
          <div className="flex flex-col">
            {format(new Date(props.user.createdAt), "PP")}
            <p className="text-dark/80 text-sm">Created At</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-5 right-5">
        <Button type="button" danger fullWidth>
          <div className="flex items-center justify-center gap-3 ">
            <MdDeleteOutline size={32} className="" />
            Delete Chat
          </div>
        </Button>
      </div>
    </div>
  );
};

export default ProfileDrawerInfo;
