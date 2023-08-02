"use client";

import {getDate, getTime} from "@/helpers/chat";
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
  const chatContainer = useRef<null | HTMLDivElement>(null);
  const prevDate = useRef<string | null>(null);

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

  useEffect(() => {
    // Trigger prevPage when first message is in view
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && conversations?.hasPrevPage) {
        conversations.prevPage().then(messages => {
          // add messages to conversations at the beginning
          setConversations({
            ...messages,
            items: [...messages.items, ...conversations.items],
          });
        });
      }
    });
    if (chatContainer.current && chatContainer.current.firstElementChild) {
      observer.observe(chatContainer.current.firstElementChild);
    }

    // cleanup function
    return () => observer.disconnect();
  }, [conversations, setConversations]);

  return (
    <div className="w-full overflow-auto" ref={scrollElement}>
      {chatId &&
      chatId.length &&
      conversations &&
      conversations?.items?.length ? (
        <div className="w-full p-4 flex flex-col last:mb-8" ref={chatContainer}>
          {conversations.items.map(item => (
            <div key={item["state"]["sid"]} className="w-full">
              {/* Show Date */}
              {prevDate.current !== getDate(item["state"]["timestamp"]) ? (
                <div className="text-center text-sm my-4 opacity-50">
                  {getDate(item["state"]["timestamp"])}
                </div>
              ) : null}
              {/* Assign Current Date */}
              {
                <div className="hidden">
                  {(prevDate.current = getDate(item["state"]["timestamp"]))}
                </div>
              }
              {/* Chat Bubble Container */}
              <div
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
                <div className="chat-footer opacity-50">
                  <time className="text-xs">
                    {getTime(item["state"]["timestamp"])}
                  </time>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export {ChatMessagesScreen};
