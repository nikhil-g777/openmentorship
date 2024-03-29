import {ERROR_ALERT} from "@/constants/common";
import {HandleFileInput, HandleSendMessage, MessageAdded} from "@/types/chat";

// Get Time in AM/PM format
const getTime = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

// Get Date in DD Month YYYY Format
const getDate = (date: Date) => {
  const day = date.getDate();
  const month = date.toLocaleString("default", {month: "long"});
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

// Chat actions
// Handle Send Message
const handleSendMessage = ({
  e,
  message,
  setMessage,
  setErrorAlert,
  setChatConnectionStatus,
  currentConversation,
}: HandleSendMessage) => {
  e.preventDefault();
  if (!message.length) return;
  if (message.length > 800) {
    setErrorAlert(ERROR_ALERT.MESSAGE_LENGTH_800, 6);
    return;
  }

  // Send message
  setChatConnectionStatus("connecting");
  currentConversation
    ?.sendMessage(message)
    .then(() => {
      setMessage("");
      setChatConnectionStatus("connected");
    })
    .catch(() => {
      setErrorAlert(ERROR_ALERT.ERROR_SENDING_MESSAGE, 6);
      setChatConnectionStatus("connected");
    });
};

// Handle File Input
const handleFileInput = ({
  e,
  setChatAttachment,
  setErrorAlert,
  setChatAttachmentModal,
}: HandleFileInput) => {
  const file = e.target.files?.[0];
  setChatAttachment(null);

  // Set Error if file size is greater than 10MB
  if (file && file?.size > 10 * 1024 * 1024) {
    setErrorAlert(ERROR_ALERT.FILE_SIZE_10MB, 6);
    return;
  }

  setChatAttachmentModal(true);
  setChatAttachment(file);
};

// Handle Message Added
const messageAddedHandler = ({
  message,
  mediaContent,
  setErrorAlert,
}: MessageAdded) => {
  if (message.type !== "media") return;
  if (message.type === "media") {
    const content = message["state"]["media"]["state"];
    message
      .getTemporaryContentUrlsForAttachedMedia()
      .then(item => {
        const url = item.values().next().value;
        content.url = url;
        mediaContent.push(content);
      })
      .catch(() => {
        setErrorAlert(ERROR_ALERT.MEDIA_RESOURCE_FAILED, 6);
      });
  }
};

export {
  getTime,
  getDate,
  handleSendMessage,
  handleFileInput,
  messageAddedHandler,
};
