"use client";

import {useChatStore, useCommonStore} from "@/zustand/store";
import {useEffect, useState} from "react";
import {NoResult} from "../noResult/no_result";
import Image from "next/image";
import {Message} from "@twilio/conversations";

type MediaContent = {
  category: string;
  contentType: string;
  filename: string;
  sid: string;
  size: number;
  url: string;
}[];

const ChatMediaContentModal = () => {
  const {chatMediaContentModal, setChatMediaContentModal, currentConversation} =
    useChatStore();
  const {setErrorAlert} = useCommonStore();
  const [mediaContent, setMediaContent] = useState<MediaContent>([]);

  // Handle Error
  const handleError = (sid: string) => {
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

  // Set Media Content
  useEffect(() => {
    // Reset media content && fallback src
    setMediaContent([]);

    // Get & Set media content
    currentConversation?.getMessages().then(messages => {
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
  }, [currentConversation, setMediaContent, setErrorAlert]);

  useEffect(() => {
    // Add new content to media content
    const messageAddedHandler = (message: Message) => {
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

    currentConversation?.on("messageAdded", messageAddedHandler);

    // Cleanup function
    return () => {
      // Perform any cleanup if needed
      currentConversation?.off("messageAdded", messageAddedHandler);
    };
  }, [currentConversation, setErrorAlert]);

  return (
    <div
      className={`modal modal-bottom sm:modal-middle ${
        chatMediaContentModal ? "modal-open" : ""
      }`}
    >
      <div className="modal-box">
        {/* Content Gallery */}
        <div className="flex flex-wrap gap-2 overflow-y-auto max-h-96">
          {mediaContent && mediaContent.length ? (
            mediaContent.map(content => (
              <div className="w-fit" key={content.sid}>
                {/* Image */}
                {content.contentType.startsWith("image") ? (
                  <a href={content.url} target="_blank">
                    <Image
                      unoptimized
                      src={content.url}
                      alt={content.filename}
                      width={100}
                      height={100}
                      className="object-cover"
                      onError={() => handleError(content.sid)}
                    />
                  </a>
                ) : null}
                {/* Video */}
                {content.contentType.startsWith("video") ? (
                  <a href={content.url} target="_blank">
                    <video
                      src={content.url}
                      width={100}
                      height={100}
                      controls
                      onError={() => handleError(content.sid)}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </a>
                ) : null}
                {/* Documents */}
                {!content.contentType.startsWith("image") &&
                !content.contentType.startsWith("video") ? (
                  <a href={content.url} target="_blank">
                    <Image
                      unoptimized
                      src="/assets/icons/document.svg"
                      alt={content.url}
                      width={100}
                      height={100}
                      className="bg-white object-cover rounded-md"
                    />
                  </a>
                ) : null}
                {/* File Name */}
                <h3 className="text-sm py-2 truncate text-center">
                  {content.filename}
                </h3>
              </div>
            ))
          ) : (
            <NoResult message="Sorry! No Media Found" />
          )}
        </div>
        {/* Close Button */}
        <div className="modal-action">
          <button
            className="btn rounded-full btn-sm text-sm capitalize btn-outline"
            onClick={() => setChatMediaContentModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export {ChatMediaContentModal};
