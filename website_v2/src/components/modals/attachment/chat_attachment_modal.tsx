"use client";

import {useChatStore, useCommonStore} from "@/zustand/store";
import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {AttachmentWrapper} from "./attachment_wrapper";

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
      <AttachmentWrapper
        contentType={contentType}
        sourceUrl={sourceUrl}
        chatAttachment={chatAttachment}
        chatConnectionStatus={chatConnectionStatus}
        handleClose={handleClose}
        handleSend={handleSend}
        chatType={chatType}
      />
    </div>
  );
};

export {ChatAttachmentModal};
