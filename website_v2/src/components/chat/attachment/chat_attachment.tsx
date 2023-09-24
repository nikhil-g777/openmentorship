"use client";

import {Message} from "@twilio/conversations";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {AttachmentWrapper} from "./attachment_wrapper";

type Props = {
  message: Message;
};

const ChatAttachment = ({message}: Props) => {
  const userId = useSession().data?.user.user._id;
  const [src, setSrc] = useState<string>("");
  const [contentName, setContentName] = useState<string>("");
  const [contentType, setContentType] = useState<string>("");

  // Update sourceSrc & contentType
  useEffect(() => {
    // Reset sourceSrc & contentType
    setSrc("");
    setContentType("");

    // Reset if message is not media
    if (message.type !== "media") {
      setSrc("");
      setContentType("");
      return;
    }

    // Set Content Name
    setContentName(message["state"]["media"]["state"]["filename"]);

    // Set Content Type
    setContentType(message["state"]["media"]["state"]["contentType"]);

    // Set Source Src
    message
      .getTemporaryContentUrlsForAttachedMedia()
      .then(url => {
        const src = url.get(message["state"]["media"]["state"]["sid"]);
        setSrc(src || "");
      })
      .catch(() => setSrc(""));
  }, [message, setSrc, setContentType]);

  // Return null if sourceSrc, contentName or contentType is empty
  if (!src || !contentName || !contentType) return null;

  return (
    <div
      className={`chat ${
        message["state"]["author"] === userId ? "chat-end" : "chat-start"
      }`}
    >
      <div
        className={`chat-bubble text-sm md:text-base ${
          message["state"]["author"] === userId ? "chat-bubble-primary" : ""
        }`}
      >
        <AttachmentWrapper
          contentType={contentType}
          src={src}
          contentName={contentName}
          message={message}
        />
      </div>
    </div>
  );
};

export {ChatAttachment};
