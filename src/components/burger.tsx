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

type Props = { currentUser: User };

const BurgerComponent = (props: Props) => {
  const routes = useRoutes();

  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <div className="w-6 h-1 rounded-full bg-dark m-1 "></div>
          <div className="w-6 h-1 rounded-full bg-dark m-1 "></div>
          <div className="w-6 h-1 rounded-full bg-dark m-1 "></div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {routes.map((route) => (
            <DropdownMenuItem key={route.label}>
              <Link
                className="flex gap-2 items-center cursor-pointer"
                href={route.href}
                onClick={route?.onClick}
              >
                {<route.icon />}
                {route.label}
              </Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              className="flex gap-2 cursor-pointer items-center"
              href="/api/auth/signout"
            >
              <AvatarComponent size={20} user={props.currentUser} />
              {props.currentUser?.name}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default BurgerComponent;
