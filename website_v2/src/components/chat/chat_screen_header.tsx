"use client";

import {useChatStore, useListingStore, useProfileStore} from "@/zustand/store";
import {useEffect} from "react";
import {ChatUserAvatar} from "./chat_user_avatar";
import Image from "next/image";
import {useSession} from "next-auth/react";
import {performSecondaryButtonAction} from "@/helpers/profile";
import {useRouter} from "next/navigation";

const ChatScreenHeader = () => {
  const token = useSession().data?.user.token || "";
  const router = useRouter();
  const {currentPage, confirmationText, setConfirmationText, setLoading} =
    useProfileStore();
  const {listingData} = useListingStore();
  const {
    currentConversation,
    chatId,
    firstName,
    setFirstName,
    profileImage,
    setProfileImage,
    typingStatus,
    setTypingStatus,
  } = useChatStore();

  useEffect(() => {
    if (listingData && listingData.length && chatId && chatId.length) {
      const contact = listingData.find(
        contact => contact.matches._id === chatId
      );
      if (contact) {
        setFirstName(contact.firstName);
        setProfileImage(contact?.profileImageUrls?.default || "");
      }
    } else {
      setFirstName("");
      setProfileImage("");
    }
  }, [listingData, chatId, setFirstName, setProfileImage]);

  // Listen to typing status
  useEffect(() => {
    // Set typing started
    currentConversation?.on("typingStarted", participant => {
      setTypingStatus({
        participant: participant.identity || "",
        isTyping: true,
      });
    });

    // Set typing ended
    currentConversation?.on("typingEnded", () => {
      setTypingStatus({participant: "", isTyping: false});
    });
  }, [currentConversation, setTypingStatus]);

  // Handle end session
  const handleEndSession = async () => {
    await performSecondaryButtonAction({
      currentPage,
      currentTab: "",
      router,
      setLoading,
      confirmationText,
      setConfirmationText,
      token,
      chatId,
    });
  };

  // Handle back
  const handleBack = () => {
    router.push("/chat");
  };

  return (
    <div className="w-full mb-auto">
      {firstName && firstName.length ? (
        <div className="w-full flex items-center bg-base-200 px-4">
          {/* Mobile back button */}
          <button
            className="md:hidden btn btn-circle btn-outline hover:btn-primary btn-sm mr-4"
            onClick={handleBack}
          >
            <Image
              src="/assets/icons/arrow.svg"
              alt="back"
              width={24}
              height={24}
              className="rotate-90 p-1"
            />
          </button>
          <ChatUserAvatar profileImage={profileImage} size={48} />
          <h3 className="w-full font-lg sm:text-xl font-semibold px-4 py-4 bg-base-200">
            {firstName}
            {/* Show typing indicator */}
            {typingStatus.isTyping && typingStatus.participant === chatId ? (
              <span className="mx-2 text-xs opacity-50">typing…</span>
            ) : null}
          </h3>
          {/* End chat */}
          <button
            className="btn btn-circle btn-error hover:saturate-150 btn-xs"
            onClick={handleEndSession}
          >
            <Image
              src="/assets/icons/power.svg"
              alt="end chat"
              width={24}
              height={24}
            />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export {ChatScreenHeader};
