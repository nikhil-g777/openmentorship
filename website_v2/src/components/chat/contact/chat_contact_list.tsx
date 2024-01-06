"use client";

import {useChatStore, useListingStore} from "@/zustand/store";
import {ChatContactListProvider} from "./chat_contact_list_provider";
import {useEffect} from "react";

const ChatContactList = () => {
  const {chatId, archiveListingData, archiveHeader, client} = useChatStore();
  const {listingData, heading} = useListingStore();

  useEffect(() => {
    if (listingData.length) {
      listingData.forEach(item => {
        client
          ?.getConversationBySid(
            item.matches.latestSession.twilioConversationSid
          )
          .then(conversation => {
            conversation.getUnreadMessagesCount().then(count => {
              item.matches.latestSession.unreadCount = count;
            });
          });
      });
    }
  }, [listingData, client]);

  return (
    <div
      className={`w-full md:max-w-xs border-r broder-base-300 overflow-y-auto ${
        chatId === "" ? "" : "hidden md:block"
      }`}
    >
      <ChatContactListProvider
        type="active"
        data={listingData}
        heading={heading}
      />
      <ChatContactListProvider
        type="archive"
        data={archiveListingData}
        heading={archiveHeader}
      />
    </div>
  );
};

export {ChatContactList};
