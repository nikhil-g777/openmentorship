import {getDate, getTime} from "@/helpers/chat";
import {useChatStore} from "@/zustand/store";
import {useSession} from "next-auth/react";
import {ChatAttachment} from "../attachment/chat_attachment";

type Props = {
  chatContainer: React.RefObject<HTMLDivElement>;
};

const MessagesWrapper = ({chatContainer}: Props) => {
  const userId = useSession().data?.user.user._id;
  const {chatId, conversations} = useChatStore();
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
              {item["state"]["type"] === "media" ? (
                <ChatAttachment message={item} />
              ) : (
                <div
                  className={`chat ${
                    item["state"]["author"] === userId
                      ? "chat-end"
                      : "chat-start"
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
              )}
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export {MessagesWrapper};
