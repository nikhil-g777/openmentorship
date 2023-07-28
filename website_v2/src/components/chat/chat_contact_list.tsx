"use client";

import {useChatStore, useListingStore} from "@/zustand/store";
import Link from "next/link";
import {ChatUserAvatar} from "./chat_user_avatar";

const ChatContactList = () => {
  const {chatId} = useChatStore();
  const {listingData, heading} = useListingStore();

  return (
    <div
      className={`w-full md:max-w-xs border-r broder-base-300 overflow-y-auto ${
        chatId === "" ? "" : "hidden md:block"
      }`}
    >
      {listingData && listingData.length && heading && heading.length ? (
        <h3 className="font-lg sm:text-xl font-semibold px-4 py-4 bg-base-200">
          {heading}
        </h3>
      ) : null}
      <ul className="w-full menu bg-base-100">
        {listingData && listingData.length
          ? listingData.map(contact => (
              <li
                key={contact.matches._id}
                className="border-b border-base-300"
              >
                <Link
                  href={"chat?id=" + contact.matches._id}
                  className={
                    chatId === contact.matches._id
                      ? "flex flex-wrap gap-4 items-center active"
                      : "flex flex-wrap gap-4 items-center"
                  }
                >
                  <ChatUserAvatar
                    profileImage={contact?.profileImageUrls?.default}
                    size={36}
                  />
                  {contact.firstName}
                </Link>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export {ChatContactList};
