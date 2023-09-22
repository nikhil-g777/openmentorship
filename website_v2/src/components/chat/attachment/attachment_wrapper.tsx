import {getTime} from "@/helpers/chat";
import {Message} from "@twilio/conversations";
import Image from "next/image";

type Props = {
  contentType: string;
  src: string;
  contentName: string;
  handleError: () => void;
  message: Message;
};

const AttachmentWrapper = ({
  contentType,
  src,
  contentName,
  handleError,
  message,
}: Props) => {
  return (
    <>
      {/* Image */}
      {contentType.startsWith("image") ? (
        <a href={src} target="_blank">
          <Image
            unoptimized
            src={src}
            alt={contentName}
            width={100}
            height={100}
            className="object-cover"
            onError={handleError}
          />
        </a>
      ) : null}
      {/* Video */}
      {contentType.startsWith("video") ? (
        <a href={src} target="_blank">
          <video
            src={src}
            width={100}
            height={100}
            controls
            onError={handleError}
          >
            Your browser does not support the video tag.
          </video>
        </a>
      ) : null}
      {/* Documents */}
      {!contentType.startsWith("image") && !contentType.startsWith("video") ? (
        <a href={src} target="_blank">
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
    </>
  );
};

export {AttachmentWrapper};
