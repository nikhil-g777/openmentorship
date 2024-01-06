"use client";

import {useEffect} from "react";
import {ChatContactList} from "./contact/chat_contact_list";
import {ChatScreen} from "./screen/chat_screen";
import {useChatStore, useListingStore} from "@/zustand/store";
import {useSearchParams} from "next/navigation";

const ChatWrapper = () => {
  const chatType = useSearchParams().get("type");
  const {listingData} = useListingStore();
  const {
    archiveListingData,
    client,
    setCurrentConversation,
    chatId,
    setCurrentChatData,
  } = useChatStore();

  useEffect(() => {
    const currentData =
      chatType === "archive" ? archiveListingData : listingData;
    const currentContact = currentData.find(
      item => item?.matches?._id === chatId
    );
    setCurrentChatData(currentContact);
    const twilioId =
      currentContact?.matches?.latestSession?.twilioConversationSid;
    if (currentContact && twilioId) {
      client?.getConversationBySid(twilioId).then(conversation => {
        setCurrentConversation(conversation);
      });
    } else {
      setCurrentConversation(null);
    }
  }, [
    archiveListingData,
    chatType,
    client,
    setCurrentConversation,
    chatId,
    listingData,
    setCurrentChatData,
  ]);

  return (
    <div className="w-full h-full px-4">
      <div className="w-full h-full max-w-6xl mx-auto flex flex-row my-8 border border-base-300">
        <ChatContactList />
        <ChatScreen />
      </div>
    </div>
  );
};

export {ChatWrapper};
