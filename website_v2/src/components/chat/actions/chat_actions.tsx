import {handleFileInput, handleSendMessage} from "@/helpers/chat";
import {useChatStore, useCommonStore} from "@/zustand/store";
import {useSearchParams} from "next/navigation";
import {ChangeEvent, useState} from "react";
import {ChatForm} from "./chat_form";

const ChatActions = () => {
  const params = useSearchParams();
  const chatId = params.get("id");
  const chatType = params.get("type");
  const {
    currentConversation,
    chatConnectionStatus,
    setChatConnectionStatus,
    setChatAttachmentModal,
    setChatAttachment,
  } = useChatStore();
  const {setErrorAlert} = useCommonStore();
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSendMessage({
      e,
      message,
      setMessage,
      setErrorAlert,
      setChatConnectionStatus,
      currentConversation,
    });
  };

  // Handle keydown
  const handleKeydown = () => {
    currentConversation?.typing();
  };

  // Handle file input
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFileInput({
      e,
      setChatAttachmentModal,
      setChatAttachment,
      setErrorAlert,
    });
  };

  return (
    <>
      {chatId && chatId.length && currentConversation ? (
        <div className="w-full flex items-center">
          <div className="w-full form-control m-4">
            <ChatForm
              handleSubmit={handleSubmit}
              handleFileChange={handleFileChange}
              chatType={chatType}
              chatConnectionStatus={chatConnectionStatus}
              message={message}
              setMessage={setMessage}
              handleKeydown={handleKeydown}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export {ChatActions};
