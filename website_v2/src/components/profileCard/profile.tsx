"use client";

import {
  getButtonColor,
  getButtonText,
  getSecondaryButtonColor,
  getSecondaryButtonText,
  performProfileAction,
  performSecondaryButtonAction,
} from "@/helpers/profile";
import {UserProfile} from "@/types/profile";
import {useCommonStore, useProfileStore} from "@/zustand/store";
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
  const session = useSession();
  const userToken = session.data?.user?.token;
  const router = useRouter();
  const {
    token,
    setToken,
    setChatId,
    setFirstName,
    currentPage,
    currentTab,
    userType,
    menteeId,
    mentorId,
    isProfileModal,
    setIsProfileModal,
    setMenteeId,
    setMentorId,
    loading,
    setLoading,
    confirmationText,
    setConfirmationText,
  } = useProfileStore();
  const {setSuccessAlert, setErrorAlert} = useCommonStore();
  const buttonText = getButtonText({currentPage, currentTab, userType});
  const buttonColor = getButtonColor(buttonText);
  const secondaryButtonText = getSecondaryButtonText({
    currentPage,
    currentTab,
    userType,
  });
  const secondaryButtonColor = getSecondaryButtonColor(secondaryButtonText);
  const [fallbackSrc, setFallbackSrc] = useState<string | null>(null);

  // Handle profile action
  const handleProfileAction = async () => {
    // Set states
    if (rootData) {
      setFirstName(rootData.firstName);
      setMentorId(rootData._id);
      if (userType === "mentee") {
        setMenteeId(session.data?.user?.user?._id || "");
        setMentorId(rootData._id);
        setChatId(rootData?.matches?._id || "");
      }
      if (userType === "mentor") {
        setMentorId(session.data?.user?.user?._id || "");
        setMenteeId(rootData._id);
        setChatId(rootData?.matches?._id || "");
      }
    }
    if (userToken && userToken.length) setToken(userToken);

    // Perform action
    await performProfileAction({
      currentPage,
      currentTab,
      chatId: currentPage !== "matches" ? "" : rootData?.matches._id,
      isProfileModal,
      setIsProfileModal,
      router,
      buttonText,
      setLoading,
      token,
      menteeId,
      mentorId,
    });
  };

  const handleSecondaryAction = async () => {
    await performSecondaryButtonAction({
      currentPage,
      currentTab,
      router,
      chatId: currentPage !== "matches" ? "" : rootData?.matches._id,
      secondaryButtonText,
      setLoading,
      token,
      confirmationText,
      setConfirmationText,
      setSuccessAlert,
      setErrorAlert,
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
          className={`w-full max-w-[200px] btn btn-accent rounded-full btn-sm mt-4 mx-auto text-sm capitalize ${buttonColor}`}
          onClick={() => handleProfileAction()}
        >
          {buttonText}
        </button>
      ) : null}
      {/* Secondary Action Button */}
      {secondaryButtonText && secondaryButtonText.length ? (
        <button
          className={`w-full max-w-[200px] btn rounded-full btn-sm mt-2 mx-auto text-sm capitalize ${secondaryButtonColor}`}
          onClick={handleSecondaryAction}
          disabled={loading}
        >
          {secondaryButtonText}
        </button>
      ) : null}
    </div>
  );
};
export {Profile};
