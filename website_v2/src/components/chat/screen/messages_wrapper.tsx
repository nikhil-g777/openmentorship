import {getDate, getTime} from "@/helpers/chat";
import {useChatStore} from "@/zustand/store";
import {useSession} from "next-auth/react";
import {ChatInlineMedia} from "./chat_inline_media";

type Props = {
  chatContainer: React.RefObject<HTMLDivElement>;
};

const MessagesWrapper = ({chatContainer}: Props) => {
  const userId = useSession().data?.user.user._id;
  const {chatId, conversations, setChatMediaContentModal} = useChatStore();
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
                }`}
              >
                {/* Text */}
                {item["state"]["type"] === "text" ? (
                  <div
                    className={`chat-bubble text-sm md:text-base ${
                      item["state"]["author"] === userId
                        ? "chat-bubble-primary"
                        : ""
                    }`}
                  >
                    {item["state"]["body"]}
                  </div>
                ) : null}
                {/* Media */}
                {item["state"]["type"] === "media" ? (
                  <div
                    className={`chat-bubble text-sm md:text-base link ${
                      item["state"]["author"] === userId
                        ? "chat-bubble-primary"
                        : ""
                    }`}
                    onClick={() => setChatMediaContentModal(true)}
                  >
                    <div className="flex items-center gap-2">
                      <ChatInlineMedia
                        contentType={
                          item["state"]["media"]["state"]["contentType"]
                        }
                        filename={item["state"]["media"]["state"]["filename"]}
                      />
                      {item["state"]["media"]["state"]["filename"]}
                    </div>
                  </div>
                ) : null}
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
    </>
  );
};

export {MessagesWrapper};
