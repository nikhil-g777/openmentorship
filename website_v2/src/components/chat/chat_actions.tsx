import {useChatStore, useListingStore} from "@/zustand/store";
import {Client} from "@twilio/conversations";
import Image from "next/image";
import {useSearchParams} from "next/navigation";
import {useState} from "react";

const ChatActions = () => {
  const params = useSearchParams();
  const chatId = params.get("id");
  const {listingData} = useListingStore();
  const {
    twilioToken,
    chatConnectionStatus,
    setChatConnectionStatus,
    setConversations,
  } = useChatStore();
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.length) return;
    if (message.length > 800)
      alert("Message should be less than 800 characters long.");

    const client = new Client(twilioToken);
    const contact = listingData.find(item => item.matches._id === chatId);
    if (contact) {
      const twilioId = contact.matches.latestSession.twilioConversationSid;
      client.getConversationBySid(twilioId).then(conversation => {
        conversation.sendMessage(message).then(() => {
          setMessage("");
          conversation.getMessages().then(messages => {
            setConversations(messages.items);
          });
        });
      });
    }

    // Set chat status
    client.on("connectionStateChanged", state => {
      setChatConnectionStatus(state);
    });
  };

  // Handle keydown
  const handleKeydown = () => {
    const client = new Client(twilioToken);
    const contact = listingData.find(item => item.matches._id === chatId);
    if (contact) {
      const twilioId = contact.matches.latestSession.twilioConversationSid;
      client.getConversationBySid(twilioId).then(conversation => {
        conversation.typing();
      });
    }
  };

  return (
    <>
      {chatId && chatId.length ? (
        <div className="w-full flex items-center">
          <div className="w-full form-control m-4">
            <form className="input-group" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Type a message..."
                className={`input input-bordered w-full ${
                  chatConnectionStatus === "connecting"
                    ? "pointer-events-none"
                    : ""
                }`}
                value={message}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMessage(e.target.value)
                }
                onKeyDown={handleKeydown}
              />
              <button
                type="submit"
                className={`btn btn-square btn-primary ${
                  chatConnectionStatus === "connecting"
                    ? "loading pointer-events-none"
                    : ""
                }`}
              >
                <Image
                  src="/assets/icons/send.svg"
                  alt="send"
                  width={24}
                  height={24}
                  className={
                    chatConnectionStatus === "connecting" ? "hidden" : ""
                  }
                />
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export {ChatActions};
