import { cn } from "@/lib/utils";
import React from "react";
import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-dark/70 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:outline-offset-0"
      )}
    >
      <Icon />
    </button>
  );
};

export default AuthSocialButton;
