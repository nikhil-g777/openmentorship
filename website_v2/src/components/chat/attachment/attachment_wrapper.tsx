"use client";

import {getTime} from "@/helpers/chat";
import {useChatStore} from "@/zustand/store";
import {Message} from "@twilio/conversations";
import Image from "next/image";

type Props = {
  contentType: string;
  src: string;
  contentName: string;
  message: Message;
};

const AttachmentWrapper = ({contentType, src, contentName, message}: Props) => {
  const {messagesAttachmentCompleted, setMessagesAttachmentCompleted} =
    useChatStore();
  return (
    <>
      {/* Image */}
      {contentType.startsWith("image") ? (
        <a href={src} target="_blank">
          <Image
            src="/assets/icons/image.svg"
            loading="eager"
            alt={contentName}
            width={64}
            height={64}
            className="object-cover mx-auto"
            onLoadingComplete={() =>
              setMessagesAttachmentCompleted([
                ...messagesAttachmentCompleted,
                true,
              ])
            }
          />
        </a>
      ) : null}
      {/* Video */}
      {contentType.startsWith("video") ? (
        <a href={src} target="_blank">
          <Image
            src="/assets/icons/video.svg"
            loading="eager"
            alt={contentName}
            width={64}
            height={64}
            className="object-cover mx-auto"
            onLoadingComplete={() =>
              setMessagesAttachmentCompleted([
                ...messagesAttachmentCompleted,
                true,
              ])
            }
          />
        </a>
      ) : null}
      {/* Documents */}
      {!contentType.startsWith("image") && !contentType.startsWith("video") ? (
        <a href={src} target="_blank">
          <Image
            src="/assets/icons/document.svg"
            loading="eager"
            alt={contentName}
            width={64}
            height={64}
            className="object-cover mx-auto"
            onLoadingComplete={() =>
              setMessagesAttachmentCompleted([
                ...messagesAttachmentCompleted,
                true,
              ])
            }
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
    </>
  );
};

export {AttachmentWrapper};
