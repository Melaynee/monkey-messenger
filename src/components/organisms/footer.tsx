"use client";
import useRoutes from "@/hooks/useRoutes";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";
import AvatarComponent from "../Avatar";
import SettingsModal from "../settings/SettingsModal";

type Props = { currentUser: User };

const Footer = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const routes = useRoutes();
  return (
    <>
      <SettingsModal
        currentUser={props.currentUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
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
          <div onClick={() => setIsOpen(true)}>
            <AvatarComponent user={props.currentUser} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
