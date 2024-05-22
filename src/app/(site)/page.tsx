import React from "react";
import WelcomeComponent from "../../components/organisms/welcome";
import Authorization from "../../components/organisms/signin";

type Props = {};

const page = (props: Props) => {
  const isAuthorised = false;
  return (
    <section className="flex min-h-full min-w-full items-center bg-primary">
      {!isAuthorised ? <Authorization /> : <WelcomeComponent />}
    </section>
  );
};

export default page;
