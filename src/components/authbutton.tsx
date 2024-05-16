import React from "react";

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthButton = (props: Props) => {
  return (
    <button
      className="text-3xl bg-dark text-[#fff] cursor-pointer font-bold mt-4 hover:text-hover hover:bg-dark/90 p-2 rounded-md transition-colors duration-300"
      onClick={() => {
        props.setOpen((prev: boolean) => !prev);
      }}
    >
      Sign in
    </button>
  );
};

export default AuthButton;
