import React from "react";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="w-full h-full flex items-center justify-center mt-20">
      <button className="btn btn-square loading"></button>
    </div>
  );
};

export default Loading;
