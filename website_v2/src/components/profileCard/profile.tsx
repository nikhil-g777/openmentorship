"use client";

import {getButtonText, performProfileAction} from "@/helpers/profile";
import {UserProfile} from "@/types/profile";
import {useProfileStore} from "@/zustand/store";
import {useSession} from "next-auth/react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useState} from "react";

type Props = {
  data: {
    [key: string]: string;
  };
  rootData?: UserProfile["user"];
};
const Profile = ({data, rootData}: Props) => {
  const menteeId = useSession().data?.user.user._id;
  const userToken = useSession().data?.user?.token;
  const router = useRouter();
  const {
    token,
    setToken,
    setFirstName,
    currentPage,
    currentTab,
    userType,
    setIsProfileModal,
    setMenteeId,
    setMentorId,
    setLoading,
  } = useProfileStore();
  const buttonText = getButtonText({currentPage, currentTab, userType});
  const [fallbackSrc, setFallbackSrc] = useState<string | null>(null);

  // Handle profile action
  const handleProfileAction = () => {
    // Set states
    if (rootData) {
      setFirstName(rootData.firstName);
      setMentorId(rootData._id);
    }
    if (menteeId && menteeId.length) setMenteeId(menteeId);
    if (userToken && userToken.length) setToken(userToken);

    // Perform action
    performProfileAction({
      currentPage,
      currentTab,
      setIsProfileModal,
      router,
      buttonText,
      setLoading,
      token,
    });
  };

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
        className="w-full min-w-[150px] max-w-[150px] h-auto rounded-md mx-auto object-cover"
      />
      {buttonText && buttonText.length ? (
        <button
          className="w-full max-w-[200px] btn btn-accent rounded-full btn-sm mt-4 mx-auto text-sm capitalize"
          onClick={() => handleProfileAction()}
        >
          {buttonText}
        </button>
      ) : null}
    </div>
  );
};
export {Profile};
