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
import AvatarComponent from "./Avatar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = { currentUser: User };

const BurgerComponent = (props: Props) => {
  const routes = useRoutes();
  const currentPath = usePathname();

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
            <Link className="flex gap-2 cursor-pointer items-center" href="/#">
              <AvatarComponent size={20} user={props.currentUser} />
              {props.currentUser?.name}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          {routes.map((route) => (
            <DropdownMenuItem
              key={route.label}
              className={cn(
                currentPath === route.href && "bg-main text-light "
              )}
            >
              <Link
                className={cn(
                  "flex gap-2 items-center cursor-pointer",
                  currentPath === route.href && "cursor-not-allowed"
                )}
                href={route.href}
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
