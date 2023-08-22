"use client";

import Image from "next/image";
import {useState} from "react";

type Props = {
  profileImage: string;
  size: number;
};

const ChatUserAvatar = ({profileImage, size}: Props) => {
  const [fallbackSrc, setFallbackSrc] = useState<string | null>(null);

  return (
    <Image
      src={
        profileImage && profileImage.length && !fallbackSrc
          ? profileImage
          : "/assets/icons/profile.svg"
      }
      alt="profile"
      width={size}
      height={size}
      onError={() => setFallbackSrc("/assets/icons/profile.svg")}
      className="rounded-full"
    />
  );
};

export {ChatUserAvatar};
