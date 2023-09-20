import {useChatStore, useCommonStore} from "@/zustand/store";
import Image from "next/image";
import {useSearchParams} from "next/navigation";
import {ChangeEvent, useState} from "react";

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
    e.preventDefault();
    if (!message.length) return;
    if (message.length > 800) {
      setErrorAlert("Message should be less than 800 characters", 6);
      return;
    }

    // Send message
    setChatConnectionStatus("connecting");
    currentConversation
      ?.sendMessage(message)
      .then(() => {
        setMessage("");
        setChatConnectionStatus("connected");
      })
      .catch(() => {
        setErrorAlert("Error sending message!", 6);
        setChatConnectionStatus("connected");
      });
  };

  // Handle keydown
  const handleKeydown = () => {
    currentConversation?.typing();
  };

  // Handle file input
  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setChatAttachment(null);

    // Set Error if file size is greater than 10MB
    if (file && file?.size > 10 * 1024 * 1024) {
      setErrorAlert("File size should be less than 10MB", 6);
      return;
    }

    setChatAttachmentModal(true);
    setChatAttachment(file);
  };

  return (
    <>
      {chatId && chatId.length && currentConversation ? (
        <div className="w-full flex items-center">
          <div className="w-full form-control m-4">
            <form className="input-group" onSubmit={handleSubmit}>
              {/* File Input */}
              <label
                htmlFor="file-input"
                className="btn btn-square btn-ghost border-neutral border-opacity-20 border-r-0"
              >
                <input
                  type="file"
                  id="file-input"
                  className="hidden"
                  onChange={handleFileInput}
                  value={""}
                  disabled={chatType === "archive"}
                />
                <Image
                  src="/assets/icons/attachment.svg"
                  alt="attachment"
                  width={24}
                  height={24}
                />
              </label>
              {/* Message Input */}
              <input
                type="text"
                placeholder="Type a message..."
                className={`input input-bordered w-full ${
                  chatConnectionStatus === "connecting"
                    ? "pointer-events-none"
                    : ""
                }`}
                value={message}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMessage(e.target.value)
                }
                onKeyDown={handleKeydown}
                disabled={chatType === "archive"}
              />
              {/* Send Button */}
              <button
                type="submit"
                className={`btn btn-square btn-primary ${
                  chatConnectionStatus === "connecting"
                    ? "loading pointer-events-none"
                    : ""
                }`}
                disabled={chatType === "archive"}
              >
                <Image
                  src="/assets/icons/send.svg"
                  alt="send"
                  width={24}
                  height={24}
                  className={
                    chatConnectionStatus === "connecting" ? "hidden" : ""
                  }
                />
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export {ChatActions};
