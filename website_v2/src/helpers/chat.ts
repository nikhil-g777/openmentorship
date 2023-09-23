import {
  HandleFileInput,
  HandleSendMessage,
  MediaContentError,
  MediaContentObserver,
  MessageAdded,
  SetMediaContent,
} from "@/types/chat";

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
    setErrorAlert("Message should be less than 800 characters", 6);
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
      setErrorAlert("Error sending message!", 6);
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
    setErrorAlert("File size should be less than 10MB", 6);
    return;
  }

  setChatAttachmentModal(true);
  setChatAttachment(file);
};

// Handle Media Content Error
const handleMediaContentError = ({
  sid,
  mediaContent,
  setMediaContent,
  setErrorAlert,
}: MediaContentError) => {
  // Find with sid and edit its url and filename
  const index = mediaContent.findIndex(content => content.sid === sid);
  if (index !== -1) {
    const content = mediaContent[index];
    content.url = "/assets/icons/sad.svg";
    content.filename = "Resource failed!";
    setMediaContent(prevState => {
      const newState = [...prevState];
      newState[index] = content;
      return newState;
    });
  }

  // Show Error Alert
  setErrorAlert("Media resource failed to load! Try reloading the page.", 6);
};

// Handle Message Added
const messageAddedHandler = ({
  message,
  setMediaContent,
  setErrorAlert,
}: MessageAdded) => {
  if (message.type === "media") {
    const content = message["state"]["media"]["state"];
    message
      .getTemporaryContentUrlsForAttachedMedia()
      .then(item => {
        const url = item.values().next().value;
        content.url = url;
        setMediaContent(prevState => [...prevState, content]);
      })
      .catch(() => {
        setErrorAlert(
          "Media resource failed to load! Try reloading the page.",
          6
        );
      });
  }
};

// Set Media Content
const getSetMediaContent = ({
  setTempConversations,
  currentConversation,
  setMediaContent,
  setErrorAlert,
}: SetMediaContent) => {
  currentConversation?.getMessages().then(messages => {
    setTempConversations(messages);
    messages.items.forEach(message => {
      if (message.type === "media") {
        const content = message["state"]["media"]["state"];
        message
          .getTemporaryContentUrlsForAttachedMedia()
          .then(item => {
            const url = item.values().next().value;
            content.url = url;
            setMediaContent(prevState => [...prevState, content]);
          })
          .catch(() => {
            setErrorAlert(
              "Media resource failed to load! Try reloading the page.",
              6
            );
          });
      }
    });
  });
};

// Media Content Observer
const mediaContentObserver = ({
  observer,
  entries,
  setLoader,
  tempConversations,
  setTempConversations,
  setMediaContent,
  setErrorAlert,
}: MediaContentObserver) => {
  // Unobserve the element & set loader to true
  observer.unobserve(entries[0].target);
  setLoader(true);
  tempConversations
    .prevPage()
    .then(messages => {
      // scroll to the first message of the previous page & set loader to false
      entries[0].target.scrollIntoView();
      setLoader(false);
      // add messages to conversations at the bottom
      setTempConversations({
        ...messages,
        items: [...tempConversations.items, ...messages.items],
      });
      messages.items.forEach(message => {
        if (message.type === "media") {
          const content = message["state"]["media"]["state"];
          message
            .getTemporaryContentUrlsForAttachedMedia()
            .then(item => {
              const url = item.values().next().value;
              content.url = url;
              setMediaContent(prevState => [...prevState, content]);
            })
            .catch(() => {
              setErrorAlert(
                "Media resource failed to load! Try reloading the page.",
                6
              );
            });
        }
      });
    })
    .catch(() => setLoader(false));
};

export {
  getTime,
  getDate,
  handleSendMessage,
  handleFileInput,
  handleMediaContentError,
  messageAddedHandler,
  getSetMediaContent,
  mediaContentObserver,
};
