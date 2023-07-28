"use client";

import {useEffect} from "react";
import {ChatContactList} from "./chat_contact_list";
import {ChatScreen} from "./chat_screen";
import {useChatStore, useListingStore} from "@/zustand/store";

const ChatWrapper = () => {
  const {listingData} = useListingStore();
  const {client, setCurrentConversation, chatId} = useChatStore();

  useEffect(() => {
    const currentContact = listingData.find(
      item => item.matches._id === chatId
    );
    const twilioId =
      currentContact?.matches.latestSession.twilioConversationSid;
    if (currentContact && twilioId) {
      client?.getConversationBySid(twilioId).then(conversation => {
        setCurrentConversation(conversation);
      });
    } else {
      setCurrentConversation(null);
    }
  }, [client, setCurrentConversation, chatId, listingData]);

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
