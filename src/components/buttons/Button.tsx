"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps {
  children?: React.ReactNode;
  fullWidth?: boolean;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      onClick={props.onClick}
      type={props.type}
      disabled={props.disabled}
      className={cn(
        "flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 text-white transition-colors duration-300",
        props.disabled && "opacity-50  cursor-not-allowed",
        props.fullWidth && "w-full",
        props.secondary
          ? "opacity-100 bg-white text-dark hover:opacity-80 transition-opacity duration-300"
          : "bg-main",
        props.danger &&
          "bg-red-500 hover:bg-red-600 focus-visible:outline-red-600",
        !props.danger && !props.secondary && "bg-main hover:bg-hover"
      )}
    >
      {props.children}
    </button>
  );
};

export default Button;
