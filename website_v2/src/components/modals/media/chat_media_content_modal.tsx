"use client";

import {useChatStore, useCommonStore} from "@/zustand/store";
import {useCallback, useEffect, useRef, useState} from "react";
import {Message, Paginator} from "@twilio/conversations";
import {MediaContentWrapper} from "./media_content_wrapper";
import {MediaContent} from "@/types/chat";
import {
  getSetMediaContent,
  handleMediaContentError,
  mediaContentObserver,
  messageAddedHandler,
} from "@/helpers/chat";

const ChatMediaContentModal = () => {
  const {chatMediaContentModal, setChatMediaContentModal, currentConversation} =
    useChatStore();
  const {setErrorAlert} = useCommonStore();
  const [mediaContent, setMediaContent] = useState<MediaContent>([]);
  const [tempConversations, setTempConversations] =
    useState<Paginator<Message> | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const mediaContentContainer = useRef<null | HTMLDivElement>(null);

  // Memoize getSetMediaContent function
  const getSetMediaContentMemoized = useCallback(getSetMediaContent, []);

  const handleError = (sid: string) => {
    // Find with sid and edit its url and filename
    handleMediaContentError({
      sid,
      mediaContent,
      setMediaContent,
      setErrorAlert,
    });
  };

  // Set Media Content
  useEffect(() => {
    // Reset media content && fallback src
    setMediaContent([]);

    // Get & Set media content
    getSetMediaContentMemoized({
      setTempConversations,
      currentConversation,
      setMediaContent,
      setErrorAlert,
    });
  }, [
    getSetMediaContentMemoized,
    currentConversation,
    setErrorAlert,
    setTempConversations,
    setMediaContent,
  ]);

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

  useEffect(() => {
    // Trigger prevPage when first message is in view
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && tempConversations?.hasPrevPage) {
        mediaContentObserver({
          observer,
          entries,
          setLoader,
          tempConversations,
          setTempConversations,
          setMediaContent,
          setErrorAlert,
        });
      }
    });
    if (
      mediaContentContainer.current &&
      mediaContentContainer.current.lastElementChild
    ) {
      observer.observe(mediaContentContainer.current.lastElementChild);
    }

    // cleanup function
    return () => observer.disconnect();
  }, [tempConversations, setMediaContent, setErrorAlert, setLoader]);

  return (
    <div
      className={`modal modal-bottom sm:modal-middle ${
        chatMediaContentModal ? "modal-open" : ""
      }`}
    >
      <MediaContentWrapper
        mediaContentContainer={mediaContentContainer}
        mediaContent={mediaContent}
        handleError={handleError}
        loader={loader}
        setChatMediaContentModal={setChatMediaContentModal}
      />
    </div>
  );
};

export {ChatMediaContentModal};
