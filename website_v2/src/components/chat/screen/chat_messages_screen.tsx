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
  const {
    currentConversation,
    conversations,
    setConversations,
    setChatIndicator,
  } = useChatStore();
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
    // Reset conversations & chat indicator
    setConversations(null);
    setChatIndicator(true);

    currentConversation
      ?.getMessages()
      .then(messages => {
        setConversations(messages);
      })
      .then(() => {
        scrollToBottom(scrollElement);
      });

    // Mark all messages as read
    currentConversation?.setAllMessagesRead();
  }, [setConversations, currentConversation, scrollToBottom, setChatIndicator]);

  useEffect(() => {
    // Scroll to bottom & add new message to conversations
    const messageAddedHandler = (message: Message) => {
      // Set chat indicator
      if (message.type === "media") setChatIndicator(true);
      // Scroll to bottom & add new message to conversations
      scrollToBottom(scrollElement);
      if (conversations) {
        setConversations({
          ...conversations,
          items: [...conversations.items, message],
        });
      }

      // Mark all messages as read
      currentConversation?.setAllMessagesRead();
    };

    currentConversation?.on("messageAdded", messageAddedHandler);

    // Cleanup function
    return () => {
      // Perform any cleanup if needed
      currentConversation?.off("messageAdded", messageAddedHandler);
    };
  }, [
    currentConversation,
    setConversations,
    conversations,
    scrollToBottom,
    setChatIndicator,
  ]);

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
            setConversations({
              ...messages,
              items: [...messages.items, ...conversations.items],
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
