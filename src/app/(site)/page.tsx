import React from "react";
import Authorization from "../../components/organisms/signin";

type Props = {};

const page = (props: Props) => {
  return (
    <section className="flex min-h-full min-w-full items-center bg-primary">
      <Authorization />
    </section>
  );
};

export default page;
