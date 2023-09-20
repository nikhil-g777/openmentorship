"use client";

import {getTime} from "@/helpers/chat";
import {Message} from "@twilio/conversations";
import {useSession} from "next-auth/react";
import Image from "next/image";
import {useEffect, useState} from "react";

type Props = {
  message: Message;
};

const ChatAttachment = ({message}: Props) => {
  const userId = useSession().data?.user.user._id;
  const [sourceSrc, setSourceSrc] = useState<string>("");
  const [contentName, setContentName] = useState<string>("");
  const [contentType, setContentType] = useState<string>("");

  // Update sourceSrc & contentType
  useEffect(() => {
    // Reset sourceSrc & contentType
    setSourceSrc("");
    setContentType("");

    // Reset if message is not media
    if (message.type !== "media") {
      setSourceSrc("");
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
        setSourceSrc(src || "");
      })
      .catch(() => setSourceSrc(""));
  }, [message, setSourceSrc, setContentType]);

  // Return null if sourceSrc, contentName or contentType is empty
  if (!sourceSrc || !contentName || !contentType) return null;

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
        {/* Image */}
        {contentType.startsWith("image") ? (
          <a href={sourceSrc} target="_blank">
            <Image
              unoptimized
              src={sourceSrc}
              alt={contentName}
              width={100}
              height={100}
              className="object-cover"
            />
          </a>
        ) : null}
        {/* Video */}
        {contentType.startsWith("video") ? (
          <a href={sourceSrc} target="_blank">
            <video src={sourceSrc} width={100} height={100} controls>
              Your browser does not support the video tag.
            </video>
          </a>
        ) : null}
        {/* Documents */}
        {!contentType.startsWith("image") &&
        !contentType.startsWith("video") ? (
          <a href={sourceSrc} target="_blank">
            <Image
              unoptimized
              src="/assets/icons/document.svg"
              alt={contentName}
              width={100}
              height={100}
              className="bg-white object-cover rounded-md"
            />
          </a>
        ) : null}
        {/* File Name */}
        <h3 className="text-sm py-2 truncate text-center">{contentName}</h3>
        {/* Timestamp */}
        <div className="chat-footer opacity-50">
          <time className="text-xs">
            {getTime(message["state"]["timestamp"])}
          </time>
        </div>
      </div>
    </div>
  );
};

export {ChatAttachment};
