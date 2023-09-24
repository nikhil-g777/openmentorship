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

const dataURL =
  "data:image/webp;base64,UklGRgACAABXRUJQVlA4WAoAAAAgAAAANgMANgMASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDhMEQAAAC82g80AB9CZStSl/4GI6H8AAA==";

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
            placeholder="blur"
            blurDataURL={dataURL}
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
            poster={dataURL}
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
            src="/assets/icons/document.svg"
            width={100}
            height={100}
            alt={contentName}
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
