"use client";

import Image from "next/image";
import {useEffect, useState} from "react";

type Props = {
  profileImage: string;
  size: number;
};

const ChatUserAvatar = ({profileImage, size}: Props) => {
  const [imageSrc, setImageSrc] = useState<string>("/assets/icons/profile.svg");

  // Update imageSrc when profileImage changes
  useEffect(() => {
    if (profileImage && profileImage.length) {
      setImageSrc(profileImage);
    } else {
      setImageSrc("/assets/icons/profile.svg");
    }
  }, [profileImage, setImageSrc]);

  return (
    <Image
      src={imageSrc}
      alt="profile"
      width={size}
      height={size}
      onError={() => setImageSrc("/assets/icons/profile.svg")}
      className="rounded-full"
    />
  );
};

export {ChatUserAvatar};
