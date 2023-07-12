"use client";

import Image from "next/image";

type Props = {
  firstName: string;
  lastName: string;
  linkedinURI: string;
};
const Name = ({firstName, lastName, linkedinURI}: Props) => {
  return (
    <div className="flex items-center gap-4">
      <h2 className="text-xl font-black">
        {firstName} {lastName}
      </h2>
      <a
        href={linkedinURI}
        target="_blank"
        rel="noreferrer"
        className="hover:brightness-110"
      >
        <Image
          src="/assets/icons/linkedin.svg"
          alt="linkedin"
          width={20}
          height={20}
        />
      </a>
    </div>
  );
};
export {Name};
