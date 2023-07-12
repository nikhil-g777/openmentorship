"use client";

import Image from "next/image";
import {useState} from "react";

type Props = {
  data: {
    [key: string]: string;
  };
  buttonText: string;
};
const Profile = ({data, buttonText}: Props) => {
  const [fallbackSrc, setFallbackSrc] = useState<string | null>(null);

  return (
    <div className="flex flex-col">
      <Image
        src={
          data && data.default && !fallbackSrc
            ? data.default
            : "/assets/icons/profile.svg"
        }
        onError={() => setFallbackSrc("/assets/icons/profile.svg")}
        alt="random-user"
        width={200}
        height={200}
        className="w-full max-w-[200px] h-auto rounded-md mx-auto object-cover"
      />
      <button className="w-full max-w-[200px] btn btn-accent rounded-full btn-sm mt-4 mx-auto text-sm capitalize">
        {buttonText}
      </button>
    </div>
  );
};
export default Profile;
