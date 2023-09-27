import Image from "next/image";

type Props = {
  contentType: string;
  sourceUrl: string;
  chatAttachment: File | null | undefined;
  chatConnectionStatus: string;
  handleClose: () => void;
  handleSend: () => void;
  chatType: string | null;
};

const AttachmentWrapper = ({
  contentType,
  sourceUrl,
  chatAttachment,
  chatConnectionStatus,
  handleClose,
  handleSend,
  chatType,
}: Props) => {
  return (
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
  );
};

export {AttachmentWrapper};
