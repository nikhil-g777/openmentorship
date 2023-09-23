"use client";

import {useChatStore, useCommonStore} from "@/zustand/store";
import Image from "next/image";
import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";

const ChatAttachmentModal = () => {
  const {
    chatConnectionStatus,
    setChatConnectionStatus,
    currentConversation,
    chatAttachmentModal,
    setChatAttachmentModal,
    chatAttachment,
    setChatAttachment,
  } = useChatStore();
  const {setErrorAlert} = useCommonStore();
  const params = useSearchParams();
  const chatType = params.get("type");
  const [contentType, setContentType] = useState<string>("");
  const sourceUrl = chatAttachment ? URL.createObjectURL(chatAttachment) : "";

  // Handle close
  const handleClose = () => {
    setChatAttachmentModal(false);
    setChatAttachment(null);
  };

  // Handle send
  const handleSend = () => {
    // Return if no attachment found
    if (!chatAttachment) {
      setErrorAlert("No attachment found!", 6);
      return;
    }

    // Send attachment
    setChatConnectionStatus("connecting");
    const formData = new FormData();
    formData.append("file", chatAttachment);
    currentConversation
      ?.sendMessage(formData)
      .then(() => {
        setChatConnectionStatus("connected");
        setChatAttachmentModal(false);
        setChatAttachment(null);
      })
      .catch(() => {
        setErrorAlert("Error sending attachment!", 6);
        setChatConnectionStatus("connected");
      });
  };

  // Update content type
  useEffect(() => {
    if (chatAttachment) {
      setContentType(chatAttachment.type);
    }
  }, [chatAttachment, setContentType]);

  return (
    <div
      className={`modal modal-bottom sm:modal-middle ${
        chatAttachmentModal ? "modal-open" : ""
      }`}
    >
      <div className="modal-box">
        {/* Image */}
        {contentType.startsWith("image") && sourceUrl ? (
          <Image
            src={sourceUrl}
            alt="user confirmation"
            width={150}
            height={150}
            className="mx-auto p-4"
          />
        ) : null}
        {/* Video */}
        {contentType.startsWith("video") && sourceUrl ? (
          <video
            src={sourceUrl}
            width={150}
            height={150}
            className="mx-auto p-4"
            controls
          >
            Your browser does not support the video tag.
          </video>
        ) : null}
        {/* Document */}
        {!contentType.startsWith("image") &&
        !contentType.startsWith("video") &&
        sourceUrl ? (
          <Image
            src="/assets/icons/document.svg"
            alt="document"
            width={150}
            height={150}
            className="mx-auto p-4 bg-cover"
          />
        ) : null}
        <h4 className="text-xl font-semibold text-center py-4">
          {chatAttachment?.name}
        </h4>
        <div className="flex items-center justify-center gap-4">
          <button
            className="btn rounded-full btn-sm text-sm capitalize btn-outline"
            onClick={handleClose}
            disabled={chatConnectionStatus === "connecting"}
          >
            Cancel
          </button>
          {/* Send Button */}
          <button
            className={`btn rounded-full btn-sm text-sm capitalize btn-outline hover:btn-primary ${
              chatConnectionStatus === "connecting" ? "loading" : ""
            }`}
            disabled={
              chatConnectionStatus === "connecting" || chatType === "archive"
            }
            onClick={handleSend}
          >
            {chatConnectionStatus === "connecting" ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export {ChatAttachmentModal};
