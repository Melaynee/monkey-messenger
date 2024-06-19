"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useRoutes from "@/hooks/useRoutes";
import Link from "next/link";
import { User } from "@prisma/client";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSettingsModalStore } from "@/hooks/useModalStore";
import AvatarComponent from "../users/Avatar";

type Props = { currentUser: User };

const BurgerComponent = (props: Props) => {
  const routes = useRoutes();
  const currentPath = usePathname();
  const { onOpen } = useSettingsModalStore();

  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none flex items-center">
          <div className="flex flex-col gap-1">
            <div className="w-6 h-1 rounded-full bg-dark  "></div>
            <div className="w-6 h-1 rounded-full bg-dark  "></div>
            <div className="w-6 h-1 rounded-full bg-dark  "></div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <div
              onClick={onOpen}
              className="w-full flex gap-2 bg-transparent cursor-pointer text-dark "
            >
              <AvatarComponent size={20} user={props.currentUser} />
              {props.currentUser?.name}
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          {routes.map((route) => (
            <DropdownMenuItem
              key={route.label}
              disabled={currentPath === route.href}
              className={cn(
                "hover:bg-main",
                currentPath === route.href && "bg-main text-light "
              )}
            >
              <Link
                className={cn("flex gap-2 items-center cursor-pointer ")}
                href={route.href}
                aria-disabled={currentPath === route.href}
                onClick={route?.onClick}
              >
                {<route.icon />}
                {route.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default BurgerComponent;
