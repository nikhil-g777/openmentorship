"use client";

import {useChatStore} from "@/zustand/store";
import {useSession} from "next-auth/react";
import {useEffect} from "react";

const ChatMessagesScreen = () => {
  const userId = useSession().data?.user.user._id;
  const {chatId, currentConversation, conversations, setConversations} =
    useChatStore();

  useEffect(() => {
    // Reset conversations
    setConversations(null);
    currentConversation?.getMessages().then(messages => {
      setConversations(messages);
    });
  }, [setConversations, currentConversation]);

  return (
    <div className="w-full overflow-auto">
      {chatId &&
      chatId.length &&
      conversations &&
      conversations?.items?.length ? (
        <div className="w-full p-4 flex flex-col overflow-auto">
          {conversations.items.map(item => (
            <div
              key={item["state"]["sid"]}
              className={`chat ${
                item["state"]["author"] === userId ? "chat-end" : "chat-start"
              }`}
            >
              <div
                className={`chat-bubble ${
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
