"use client";

import {useChatStore, useListingStore} from "@/zustand/store";
import {useEffect, useState} from "react";
import {ChatUserAvatar} from "./chat_user_avatar";
import {useSearchParams} from "next/navigation";
import {UserProfile} from "@/types/profile";
import {Participant} from "@twilio/conversations";
import {HeaderActions} from "./header_actions";
import {ReviewBanner} from "./review_banner";

const ChatScreenHeader = () => {
  const chatType = useSearchParams().get("type");
  const {listingData} = useListingStore();
  const {
    archiveListingData,
    currentConversation,
    chatId,
    firstName,
    setFirstName,
    profileImage,
    setProfileImage,
    typingStatus,
    setTypingStatus,
    setChatMediaContentModal,
  } = useChatStore();
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const currentData: UserProfile["user"][] =
      chatType === "archive" ? archiveListingData : listingData;
    if (currentData && currentData.length && chatId && chatId.length) {
      const contact = currentData.find(
        contact => contact?.matches?._id === chatId
      );
      if (contact) {
        setUserId(contact._id);
        setFirstName(contact.firstName);
        setProfileImage(contact?.profileImageUrls?.default || "");
      } else {
        setUserId("");
        setFirstName("");
        setProfileImage("");
      }
    }
  }, [
    archiveListingData,
    chatType,
    listingData,
    chatId,
    setFirstName,
    setProfileImage,
  ]);

  // Listen to typing status
  useEffect(() => {
    const typingStartedHandler = (participant: Participant) => {
      setTypingStatus({
        participant: participant.identity || "",
        isTyping: true,
      });
    };

    const typingEndedHandler = () => {
      setTypingStatus({participant: "", isTyping: false});
    };

    // Add event listeners
    currentConversation?.on("typingStarted", typingStartedHandler);
    currentConversation?.on("typingEnded", typingEndedHandler);

    // Cleanup function
    return () => {
      // Remove event listeners when component unmounts
      currentConversation?.off("typingStarted", typingStartedHandler);
      currentConversation?.off("typingEnded", typingEndedHandler);
    };
  }, [currentConversation, setTypingStatus]);

  return (
    <div className="w-full mb-auto">
      <div className="w-full flex items-center bg-base-200 px-4">
        <HeaderActions
          currentConversation={currentConversation}
          firstName={firstName}
          typingStatus={typingStatus}
          userId={userId}
          chatType={chatType}
          setChatMediaContentModal={setChatMediaContentModal}
        >
          <ChatUserAvatar profileImage={profileImage} size={48} />
        </HeaderActions>
      </div>
      {/* Review Banner */}
      <ReviewBanner />
    </div>
  );
};

export {ChatScreenHeader};
