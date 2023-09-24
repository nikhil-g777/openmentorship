import {getTime} from "@/helpers/chat";
import {Message} from "@twilio/conversations";
import Image from "next/image";

type Props = {
  contentType: string;
  src: string;
  contentName: string;
  message: Message;
};

const AttachmentWrapper = ({contentType, src, contentName, message}: Props) => {
  return (
    <>
      {/* Image */}
      {contentType.startsWith("image") ? (
        <a href={src} target="_blank">
          <Image
            src="/assets/icons/image.svg"
            alt={contentName}
            width={64}
            height={64}
            className="object-cover mx-auto"
          />
        </a>
      ) : null}
      {/* Video */}
      {contentType.startsWith("video") ? (
        <a href={src} target="_blank">
          <Image
            src="/assets/icons/video.svg"
            alt={contentName}
            width={64}
            height={64}
            className="object-cover mx-auto"
          />
        </a>
      ) : null}
      {/* Documents */}
      {!contentType.startsWith("image") && !contentType.startsWith("video") ? (
        <a href={src} target="_blank">
          <Image
            src="/assets/icons/document.svg"
            alt={contentName}
            width={64}
            height={64}
            className="object-cover mx-auto"
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
