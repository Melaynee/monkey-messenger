import React from "react";

type Props = {};

const EmpyState = (props: Props) => {
  return (
    <div className="w-screen h-screen bg-scene">
      <div className="w-full h-full overflow-y-scroll">
        <div className="w-3/4 h-fit mx-auto"></div>
      </div>
    </div>
  );
};

export default EmpyState;
