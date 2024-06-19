import { cn } from "@/lib/utils";
import React from "react";

type Props = { size: number };

const OnlineIcon = (props: Props) => {
  return (
    <div
      className={cn(
        " bg-green-500 border-2 border-white rounded-full",
        props.size < 40 ? "w-2 h-2 border-1" : "w-3 h-3"
      )}
    ></div>
  );
};

export default OnlineIcon;
