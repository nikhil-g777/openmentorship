"use client";

import {useChatStore, useCommonStore} from "@/zustand/store";
import {useEffect, useState} from "react";
import {Message, Paginator} from "@twilio/conversations";
import {MediaContentWrapper} from "./media_content_wrapper";
import {MediaContent} from "@/types/chat";
import {messageAddedHandler} from "@/helpers/chat";

const ChatMediaContentModal = () => {
  const {chatMediaContentModal, setChatMediaContentModal, currentConversation} =
    useChatStore();
  const {setErrorAlert} = useCommonStore();
  const [mediaContent, setMediaContent] = useState<MediaContent>([]);
  const [tempConversations, setTempConversations] =
    useState<Paginator<Message> | null>(null);

  // Set Media Content
  useEffect(() => {
    // Reset temp conversations
    setTempConversations(null);

    currentConversation?.getMessages().then(messages => {
      if (!tempConversations) setTempConversations(messages);
    });
  }, [currentConversation, tempConversations, setTempConversations]);

  // Add all messages to media content
  useEffect(() => {
    // Reset media content
    setMediaContent([]);

    if (tempConversations && tempConversations.hasPrevPage) {
      tempConversations?.prevPage().then(messages => {
        setTempConversations({
          ...messages,
          items: [...messages.items, ...tempConversations.items],
        });
        tempConversations.items.forEach(message => {
          if (message.type === "media") {
            const content = message["state"]["media"]["state"];
            message
              .getTemporaryContentUrlsForAttachedMedia()
              .then(item => {
                const url = item.values().next().value;
                content.url = url;
                // Set media content
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
    }
  }, [tempConversations, setTempConversations, setErrorAlert, setMediaContent]);

  useEffect(() => {
    currentConversation?.on("messageAdded", message =>
      messageAddedHandler({message, setMediaContent, setErrorAlert})
    );

    // Cleanup function
    return () => {
      // Perform any cleanup if needed
      currentConversation?.off("messageAdded", message =>
        messageAddedHandler({message, setMediaContent, setErrorAlert})
      );
    };
  }, [currentConversation, setErrorAlert]);

  return (
    <div
      className={`modal modal-bottom sm:modal-middle ${
        chatMediaContentModal ? "modal-open" : ""
      }`}
    >
      <MediaContentWrapper
        mediaContent={mediaContent}
        setChatMediaContentModal={setChatMediaContentModal}
      />
    </div>
  );
};

export {ChatMediaContentModal};
