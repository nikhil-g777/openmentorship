"use client";

import {useChatStore} from "@/zustand/store";
import {useSession} from "next-auth/react";
import {MutableRefObject, useEffect, useRef} from "react";

const ChatMessagesScreen = () => {
  const userId = useSession().data?.user.user._id;
  const {chatId, currentConversation, conversations, setConversations} =
    useChatStore();
  const scrollElement = useRef<null | HTMLDivElement>(null);
  const scrollToBottom = (element: MutableRefObject<null | HTMLDivElement>) => {
    if (element.current) {
      element.current.scrollTop = element.current?.scrollHeight;
    }
  };

  useEffect(() => {
    // Reset conversations
    setConversations(null);
    currentConversation
      ?.getMessages()
      .then(messages => {
        setConversations(messages);
      })
      .then(() => {
        scrollToBottom(scrollElement);
      });
  }, [setConversations, currentConversation]);

  useEffect(() => {
    // Scroll to bottom
    currentConversation?.on("messageAdded", () => {
      scrollToBottom(scrollElement);
    });
  }, [currentConversation]);

  return (
    <div className="w-full overflow-auto" ref={scrollElement}>
      {chatId &&
      chatId.length &&
      conversations &&
      conversations?.items?.length ? (
        <div className="w-full p-4 flex flex-col last:mb-8">
          {conversations.items.map(item => (
            <div
              key={item["state"]["sid"]}
              className={`chat ${
                item["state"]["author"] === userId ? "chat-end" : "chat-start"
              }`}
            >
              <div
                className={`chat-bubble text-sm md:text-base ${
                  item["state"]["author"] === userId
                    ? "chat-bubble-primary"
                    : ""
                }`}
              >
                {item["state"]["body"]}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export {ChatMessagesScreen};
