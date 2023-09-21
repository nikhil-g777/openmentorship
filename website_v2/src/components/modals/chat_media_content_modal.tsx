"use client";

import {useChatStore, useCommonStore} from "@/zustand/store";
import {useEffect, useRef, useState} from "react";
import {NoResult} from "../noResult/no_result";
import Image from "next/image";
import {Message, Paginator} from "@twilio/conversations";

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
  const [tempConversations, setTempConversations] =
    useState<Paginator<Message> | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const mediaContentContainer = useRef<null | HTMLDivElement>(null);

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

  useEffect(() => {
    // Trigger prevPage when first message is in view
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && tempConversations?.hasPrevPage) {
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
      <div className="modal-box">
        {/* Content Gallery */}
        <div
          className="flex flex-wrap gap-2 overflow-y-auto max-h-96"
          ref={mediaContentContainer}
        >
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
          {/* Loader */}
          {loader ? (
            <div className="w-full flex justify-center items-center my-4">
              <button className="btn btn-square loading"></button>
            </div>
          ) : null}
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
