"use client";

import Image from "next/image";
import React from "react";
import AuthForm from "../authform";
import AuthButton from "../authbutton";

type Props = {};

const Authorization = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div
      className="flex flex-col items-center  mx-auto transition-all duration-700 ease-in-out"
      style={{
        transform: `${open ? "translate(0%, -5%)" : "translate(0%, 0%)"}`,
      }}
    >
      <Image
        src={"/img/logo.jpg"}
        alt="logo"
        width={200}
        height={200}
        className="rounded-full transition-transform duration-300 ease-in-out"
        style={{ transform: `${open ? "scale(0.75)" : "scale(1)"}` }}
      />

      <h1
        className="text-3xl text-[#fff] font-bold mt-4 transition-transform duration-700 ease-out"
        style={{
          transform: `${open ? "scale(0.75)" : "scale(1)"}`,
          marginTop: `${open ? "-20px" : "20px"}`,
          marginBottom: `${open ? "-20px" : "0px"}`,
        }}
      >
        Monkey Messenger
      </h1>
      {open && <AuthForm />}
      {!open && <AuthButton setOpen={setOpen} />}
    </div>
  );
};

export default Authorization;
