"use client";

import {useChatStore} from "@/zustand/store";
import {Message} from "@twilio/conversations";
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {MessagesWrapper} from "./messages_wrapper";

const ChatMessagesScreen = () => {
  const {currentConversation, conversations, setConversations} = useChatStore();
  const scrollElement = useRef<null | HTMLDivElement>(null);
  const scrollToBottom = useCallback(
    (element: MutableRefObject<null | HTMLDivElement>) => {
      if (element.current) {
        element.current.scrollTop = element.current?.scrollHeight;
      }
    },
    []
  );
  const chatContainer = useRef<null | HTMLDivElement>(null);
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    // Reset conversations
    setConversations(null);

    currentConversation?.getMessages().then(messages => {
      const textMessages = messages.items.filter(item => item.type !== "media");
      setConversations({...messages, items: textMessages});
    });
  }, [setConversations, currentConversation]);

  // Scroll to bottom when conversations are loaded
  useEffect(() => {
    // Scroll to bottom
    if (conversations) scrollToBottom(scrollElement);
  }, [conversations, scrollToBottom, scrollElement]);

  useEffect(() => {
    // Scroll to bottom & add new message to conversations
    const messageAddedHandler = (message: Message) => {
      // Return if message is media
      if (message.type === "media") return;

      // Scroll to bottom & add new message to conversations
      scrollToBottom(scrollElement);
      if (conversations) {
        setConversations({
          ...conversations,
          items: [...conversations.items, message],
        });
      }
    };

    currentConversation?.on("messageAdded", messageAddedHandler);

    // Cleanup function
    return () => {
      // Perform any cleanup if needed
      currentConversation?.off("messageAdded", messageAddedHandler);
    };
  }, [currentConversation, setConversations, scrollToBottom, conversations]);

  useEffect(() => {
    // Trigger prevPage when first message is in view
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && conversations?.hasPrevPage) {
        // Unobserve the element & set loader to true
        observer.unobserve(entries[0].target);
        setLoader(true);
        conversations
          .prevPage()
          .then(messages => {
            // scroll to the first message of the previous page & set loader to false
            entries[0].target.scrollIntoView();
            setLoader(false);
            // add messages to conversations at the beginning
            const textMessages = messages.items.filter(
              item => item.type !== "media"
            );
            setConversations({
              ...messages,
              items: [...textMessages, ...conversations.items],
            });
          })
          .catch(() => setLoader(false));
      }
    });
    if (chatContainer.current && chatContainer.current.firstElementChild) {
      observer.observe(chatContainer.current.firstElementChild);
    }

    // cleanup function
    return () => observer.disconnect();
  }, [conversations, setConversations]);

  return (
    <div className="w-full overflow-auto" ref={scrollElement}>
      {/* Loader */}
      {loader ? (
        <div className="w-full flex justify-center items-center my-4">
          <button className="btn btn-square loading"></button>
        </div>
      ) : null}
      <MessagesWrapper chatContainer={chatContainer} />
    </div>
  );
};

export {ChatMessagesScreen};
