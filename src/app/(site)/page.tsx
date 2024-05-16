import React from "react";
import WelcomeComponent from "../organisms/welcome";
import Authorization from "../organisms/signin";

type Props = {};

const page = (props: Props) => {
  const isAuthorised = false;
  return (
    <section className="flex min-h-full  items-center bg-primary">
      {!isAuthorised ? <Authorization /> : <WelcomeComponent />}
    </section>
  );
};

export default page;
