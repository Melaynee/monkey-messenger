"use client";
import useRoutes from "@/hooks/useRoutes";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { useSettingsModalStore } from "@/hooks/useModalStore";
import AvatarComponent from "../users/Avatar";

type Props = { currentUser: User };

const Footer = (props: Props) => {
  const routes = useRoutes();
  const { onOpen } = useSettingsModalStore();
  return (
    <div className="bg-[#fff] p-4 block lg:hidden ">
      <div className="flex justify-around items-center w-1/2 mx-auto">
        {routes.map((route) => (
          <Link
            href={route.href}
            key={route.label}
            onClick={route?.onClick}
            className={cn(
              "flex cursor-pointer text-scene hover:text-hover transition-colors duration-300",
              route?.active && "text-main"
            )}
          >
            {<route.icon size={44} />}
          </Link>
        ))}
        <div onClick={onOpen}>
          <AvatarComponent user={props.currentUser} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
