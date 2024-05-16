import React from "react";
import WelcomeComponent from "../organisms/welcome";

type Props = {};

const page = (props: Props) => {
  return (
    <section className="flex min-h-full  items-center bg-primary">
      <WelcomeComponent />
    </section>
  );
};

export default page;
