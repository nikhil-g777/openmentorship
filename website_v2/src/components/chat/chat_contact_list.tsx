"use client";

import {useChatStore, useListingStore} from "@/zustand/store";
import {ChatContactListProvider} from "./chat_contact_list_provider";

const ChatContactList = () => {
  const {chatId, archiveListingData, archiveHeader} = useChatStore();
  const {listingData, heading} = useListingStore();

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
