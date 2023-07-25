import {useChatStore} from "@/zustand/store";
import {useSession} from "next-auth/react";

const ChatMessagesScreen = () => {
  const userId = useSession().data?.user.user._id;
  const {chatId, conversations, chatConnectionStatus} = useChatStore();

  return (
    <div className="w-full overflow-auto">
      {chatId &&
      chatId.length &&
      conversations &&
      conversations.length &&
      chatConnectionStatus === "connected" ? (
        <div className="w-full p-4 flex flex-col overflow-auto">
          {conversations.map(item => (
            <div
              key={item.state.sid}
              className={`chat ${
                item.state.author === userId ? "chat-end" : "chat-start"
              }`}
            >
              <div
                className={`chat-bubble ${
                  item.state.author === userId ? "chat-bubble-primary" : ""
                }`}
              >
                {item.state.body}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export {ChatMessagesScreen};
