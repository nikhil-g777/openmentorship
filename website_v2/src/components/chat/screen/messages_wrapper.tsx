import {getDate, getTime} from "@/helpers/chat";
import {useChatStore} from "@/zustand/store";
import {useSession} from "next-auth/react";
import {useRef} from "react";
import {ChatAttachment} from "../attachment/chat_attachment";

const MessagesWrapper = () => {
  const userId = useSession().data?.user.user._id;
  const {chatId, conversations} = useChatStore();
  const chatContainer = useRef<null | HTMLDivElement>(null);
  return (
    <>
      {chatId &&
      chatId.length &&
      conversations &&
      conversations?.items?.length ? (
        <div
          className="w-full p-4 flex flex-col last:mb-16"
          ref={chatContainer}
        >
          {conversations.items.map((item, index) => (
            <div key={item["state"]["sid"]} className="w-full">
              {/* Show Date */}
              {index === 0 ||
              getDate(item["state"]["timestamp"]) !==
                getDate(
                  conversations.items[index - 1]["state"]["timestamp"]
                ) ? (
                <div className="text-center text-sm my-4 opacity-50">
                  {getDate(item["state"]["timestamp"])}
                </div>
              ) : null}
              {/* Chat Bubble Container */}
              <div
                className={`chat ${
                  item["state"]["author"] === userId ? "chat-end" : "chat-start"
                } ${item["state"]["type"] === "media" ? "hidden" : ""}`}
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
              {/* Chat Attachment */}
              <ChatAttachment message={item} />
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export {MessagesWrapper};
