"use client";

import {useChatStore, useListingStore, useProfileStore} from "@/zustand/store";
import {useEffect} from "react";
import {ChatUserAvatar} from "./chat_user_avatar";
import Image from "next/image";
import { useSession } from "next-auth/react";

const ChatScreenHeader = () => {
  const token = useSession().data?.user.token || "";
  const {setCurrentPage, setCurrentTab, setConfirmationText, setToken, setIsProfileModal} = useProfileStore();
  const {listingData} = useListingStore();
  const {
    chatId,
    firstName,
    setFirstName,
    profileImage,
    setProfileImage,
    isTyping,
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

  // Handle end session
  const handleEndSession = () => {
    setConfirmationText("Are you sure that you would like to end the session?");

    // Set states to perform end session action
    setCurrentPage("matches");
    setCurrentTab("active");
    setToken(token);
  };

  return (
    <div className="w-full mb-auto">
      {firstName && firstName.length ? (
        <div className="w-full flex items-center bg-base-200 px-4">
          <ChatUserAvatar profileImage={profileImage} size={48} />
          <h3 className="w-full font-lg sm:text-xl font-semibold px-4 py-4 bg-base-200">
            {firstName}
            {/* Show typing indicator */}
            {isTyping ? (
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
