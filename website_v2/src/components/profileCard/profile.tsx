"use client";

import {
  getButtonColor,
  getButtonText,
  performProfileAction,
} from "@/helpers/profile/primary_button";
import {
  getSecondaryButtonColor,
  getSecondaryButtonText,
  performSecondaryButtonAction,
} from "@/helpers/profile/secondary_button";
import {UserProfile} from "@/types/profile";
import {useChatStore, useCommonStore, useProfileStore} from "@/zustand/store";
import {useSession} from "next-auth/react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {AdminActionsWrapper} from "./admin/admin_action_wrapper";
import {AdminUserDetails} from "./admin/admin_user_details";
import {PAGES, USER_TYPE} from "@/constants/common";

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
  const {setCurrentChatData} = useChatStore();
  const {setSuccessAlert, setErrorAlert, setUserConfirmation} =
    useCommonStore();
  const buttonText = getButtonText({
    currentPage,
    currentTab,
    userType,
  });
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
      if (userType === USER_TYPE.MENTEE) {
        setMenteeId(session.data?.user?.user?._id || "");
        setMentorId(rootData._id);
        setChatId(rootData?.matches?._id || "");
      }
      if (userType === USER_TYPE.MENTOR) {
        setMentorId(session.data?.user?.user?._id || "");
        setMenteeId(rootData._id);
        setChatId(rootData?.matches?._id || "");
      }
    }
    if (userToken && userToken.length) setToken(userToken);
    // Set User Confirmation Modal
    if (currentPage === PAGES.EXPLORE && !userToken) {
      return setUserConfirmation({
        heading: "Join Our Mentorship Program!",
        subHeading: "Sign in to connect with mentors",
        message:
          "You're just one step away from connecting with our experienced mentors. Please sign in or create an account to send a request and start your journey in our mentorship program.",
      });
    }

    // Perform action
    await performProfileAction({
      currentPage,
      currentTab,
      chatId: currentPage !== PAGES.MATCHES ? "" : rootData?.matches._id,
      isProfileModal,
      setIsProfileModal,
      router,
      buttonText,
      setLoading,
      token,
      confirmationText,
      setConfirmationText,
      menteeId,
      mentorId,
      requestMessage: rootData?.matches?.requestMessage,
    });
  };

  const handleSecondaryAction = async () => {
    // Set states
    if (rootData) {
      setToken(userToken || "");
      setChatId(rootData?.matches?._id || "");
      setCurrentChatData(rootData);
    }

    await performSecondaryButtonAction({
      currentPage,
      currentTab,
      router,
      chatId: currentPage !== PAGES.MATCHES ? "" : rootData?.matches._id,
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
          className={`w-full max-w-[200px] btn rounded-full btn-sm mt-4 mx-auto text-sm capitalize truncate ${buttonColor}`}
          onClick={() => handleProfileAction()}
        >
          {buttonText}
        </button>
      ) : null}
      {/* Secondary Action Button */}
      {secondaryButtonText && secondaryButtonText.length ? (
        <button
          className={`w-full max-w-[200px] btn rounded-full btn-sm mt-2 mx-auto text-sm capitalize truncate ${secondaryButtonColor}`}
          onClick={handleSecondaryAction}
          disabled={loading}
        >
          {secondaryButtonText}
        </button>
      ) : null}

      {/* Admin Actions & Details */}
      {currentPage === PAGES.ADMIN.DASHBOARD && rootData ? (
        <AdminActionsWrapper data={rootData} />
      ) : null}
      {currentPage === PAGES.ADMIN.DASHBOARD && rootData ? (
        <AdminUserDetails data={rootData} />
      ) : null}
    </div>
  );
};
export {Profile};
