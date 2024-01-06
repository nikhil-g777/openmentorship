import Image from "next/image";

type Props = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  chatType: string | null;
  chatConnectionStatus: string | null;
  message: string;
  setMessage: (message: string) => void;
  handleKeydown: () => void;
};

const ChatForm = ({
  handleSubmit,
  handleFileChange,
  chatType,
  chatConnectionStatus,
  message,
  setMessage,
  handleKeydown,
}: Props) => {
  return (
    <form className="input-group" onSubmit={handleSubmit}>
      {/* File Input */}
      <label
        htmlFor="file-input"
        className={`btn btn-square btn-ghost border-neutral border-opacity-20 border-r-0 ${
          chatType === "archive" ? "btn-disabled border-none" : ""
        }`}
      >
        <input
          type="file"
          id="file-input"
          className="hidden"
          onChange={handleFileChange}
          value={""}
          disabled={chatType === "archive"}
        />
        <Image
          src="/assets/icons/attachment.svg"
          alt="attachment"
          width={24}
          height={24}
          className={chatType === "archive" ? "grayscale" : ""}
        />
      </label>
      {/* Message Input */}
      <input
        type="text"
        placeholder="Type a message..."
        className={`input input-bordered w-full ${
          chatConnectionStatus === "connecting" ? "pointer-events-none" : ""
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
          className={chatConnectionStatus === "connecting" ? "hidden" : ""}
        />
      </button>
    </form>
  );
};

export {ChatForm};
