"use client";
import useRoutes from "@/hooks/useRoutes";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import Link from "next/link";
import React from "react";

type Props = { currentUser: User };

const Footer = (props: Props) => {
  const routes = useRoutes();
  return (
    <div className="bg-[#fff] p-4 ">
      <div className="flex justify-around items-center w-1/2 mx-auto">
        {routes.map((route) => (
          <Link
            href={route.href}
            key={route.label}
            onClick={route?.onClick}
            className={cn(
              "flex cursor-pointer text-light hover:text-hover transition-colors duration-300",
              route?.active && "text-primary"
            )}
          >
            {<route.icon size={44} />}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Footer;
