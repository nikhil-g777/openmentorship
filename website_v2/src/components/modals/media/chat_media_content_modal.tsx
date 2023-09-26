"use client";

import {useChatStore, useCommonStore} from "@/zustand/store";
import {useEffect, useState} from "react";
import {MediaContentWrapper} from "./media_content_wrapper";
import {messageAddedHandler} from "@/helpers/chat";

const ChatMediaContentModal = () => {
  const {
    chatMediaContentModal,
    setChatMediaContentModal,
    currentConversation,
    mediaContent,
    setMediaContent,
    mediaConversations,
    setMediaConversations,
    client,
  } = useChatStore();
  const {setErrorAlert} = useCommonStore();
  const [sids, setSids] = useState<string[]>([]);

  // Set Media Content
  useEffect(() => {
    // Reset media conversations & sids
    setMediaConversations(null);
    setMediaContent([]);
    setSids([]);

    // Return if there is no current conversation
    if (!currentConversation) return;

    // Set media conversations
    currentConversation
      .getMessages()
      .then(messages => {
        const mediaMessages = messages.items.filter(
          message => message.type === "media"
        );
        mediaMessages.forEach(item => {
          setSids(prevState => [
            ...prevState,
            item["state"]["media"]["state"]["sid"],
          ]);
        });
        setMediaConversations({...messages, items: mediaMessages});
      })
      .catch(() => {
        setErrorAlert(
          "Media resource failed to load! Try reloading the page.",
          6
        );
      });
  }, [
    currentConversation,
    setMediaConversations,
    setSids,
    setErrorAlert,
    setMediaContent,
  ]);

  // Generate urls for media content
  useEffect(() => {
    if (sids.length === 0) return;
    client?.getTemporaryContentUrlsForMediaSids(sids).then(urls => {
      mediaConversations?.items.forEach(item => {
        const content = item["state"]["media"]["state"];
        const url = urls.get(content["sid"]);
        content.url = url;
        mediaContent.push(content);
      });
    });
  }, [client, sids, mediaConversations, mediaContent]);

  useEffect(() => {
    currentConversation?.on("messageAdded", message =>
      messageAddedHandler({message, mediaContent, setErrorAlert})
    );

    // Cleanup function
    return () => {
      // Perform any cleanup if needed
      currentConversation?.off("messageAdded", message =>
        messageAddedHandler({message, mediaContent, setErrorAlert})
      );
    };
  }, [currentConversation, setErrorAlert, mediaContent]);

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
