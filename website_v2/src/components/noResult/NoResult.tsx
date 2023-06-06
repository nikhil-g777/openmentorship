import Image from "next/image";
import React from "react";

type Props = {
  message: string;
};

const NoResult = ({message}: Props) => {
  return (
    <div className="w-full max-w-6xl mx-auto mt-20 my-40 flex flex-col items-center">
      <h2 className="text-xl text-center mb-4">{message}</h2>
      <Image
        src="/assets/icons/sad.svg"
        alt="no result"
        width={48}
        height={48}
      />
    </div>
  );
};

export default NoResult;
