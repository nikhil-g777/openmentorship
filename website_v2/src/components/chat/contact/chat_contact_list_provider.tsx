"use client";

import {UserProfile} from "@/types/profile";
import Link from "next/link";
import React from "react";
import {ChatUserAvatar} from "../header/chat_user_avatar";
import {useChatStore} from "@/zustand/store";

type Props = {
  type: "active" | "archive";
  data: UserProfile["user"][] | [];
  heading: string;
};

const ChatContactListProvider = ({type, data, heading}: Props) => {
  const {chatId} = useChatStore();
  return (
    <>
      {data && data.length && heading && heading.length ? (
        <h3 className="font-lg sm:text-xl font-semibold px-4 py-4 bg-base-200">
          {heading}
        </h3>
      ) : null}
      <ul className="w-full menu bg-base-100">
        {data && data.length
          ? data.map((contact, index) => (
              <li
                key={contact?.matches?._id || index}
                className="border-b border-base-300"
              >
                <Link
                  href={
                    type === "active"
                      ? "chat?id=" + contact?.matches?._id
                      : "chat?id=" + contact?.matches?._id + "&type=archive"
                  }
                  className={
                    chatId === contact?.matches?._id
                      ? "flex flex-wrap gap-4 items-center active"
                      : "flex flex-wrap gap-4 items-center"
                  }
                >
                  <ChatUserAvatar
                    profileImage={contact?.profileImageUrls?.default}
                    size={36}
                  />
                  {contact.firstName}

                  {/* Unread messages count */}
                  {contact?.matches?.latestSession?.unreadCount &&
                  type === "active" ? (
                    <div className="badge badge-primary badge-lg ml-auto">
                      {contact.matches.latestSession.unreadCount > 99
                        ? "99+"
                        : contact.matches.latestSession.unreadCount}
                    </div>
                  ) : null}
                </Link>
              </li>
            ))
          : null}
      </ul>
    </>
  );
};

export {ChatContactListProvider};
