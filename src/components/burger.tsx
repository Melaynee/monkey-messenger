import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "./ui/switch";

type Props = {};

const BurgerComponent = (props: Props) => {
  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <div className="w-6 h-1 rounded-full bg-dark m-1 "></div>
          <div className="w-6 h-1 rounded-full bg-dark m-1 "></div>
          <div className="w-6 h-1 rounded-full bg-dark m-1 "></div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Saved Messages</DropdownMenuItem>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Contacts</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex gap-2">
            <label htmlFor="toggle-dark-mode">Night Mode</label>
            <Switch id="toggle-dark-mode" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default BurgerComponent;
