"use client";

import {NoResult} from "@/components/noResult/no_result";
import {useChatStore} from "@/zustand/store";
import Image from "next/image";
import {useEffect, useRef, useState} from "react";

const MediaContentWrapper = () => {
  const {
    setChatMediaContentModal,
    mediaContent,
    mediaConversations,
    setMediaConversations,
  } = useChatStore();
  const [sids, setSids] = useState<string[]>([]);
  const mediaContentContainer = useRef<HTMLDivElement | null>(null);
  // Filter mediaContent with only unique sids
  const uniqueMediaContent = mediaContent?.filter(
    (v, i, a) => a.findIndex(t => t.sid === v.sid) === i
  );

  // Add new media content to media content list
  useEffect(() => {
    if (mediaConversations && mediaConversations.hasPrevPage) {
      mediaConversations.prevPage().then(messages => {
        // add messages to conversations at the beginning
        const content = messages.items.filter(item => item.type === "media");
        const mediaSids = content.map(
          item => item["state"]["media"]["state"]["sid"]
        );
        setSids([...sids, ...mediaSids]);
        setMediaConversations({
          ...messages,
          items: [...mediaConversations.items, ...content],
        });
      });
    }
  }, [mediaConversations, setMediaConversations, sids, setSids]);

  return (
    <div className="modal-box">
      {/* Content Gallery */}
      {uniqueMediaContent && uniqueMediaContent.length ? (
        <div
          ref={mediaContentContainer}
          className="flex flex-wrap justify-stretch gap-4 overflow-y-auto max-h-96"
        >
          {uniqueMediaContent.map(content => (
            <div className="w-fit" key={content.sid}>
              <div className="bg-primary p-1 rounded-md">
                {/* Image */}
                {content.contentType.startsWith("image") ? (
                  <a href={content.url} target="_blank">
                    <Image
                      src="/assets/icons/image.svg"
                      alt={content.filename}
                      width={64}
                      height={64}
                      className="object-cover mx-auto"
                    />
                  </a>
                ) : null}
                {/* Video */}
                {content.contentType.startsWith("video") ? (
                  <a href={content.url} target="_blank">
                    <Image
                      src="/assets/icons/video.svg"
                      alt={content.filename}
                      width={64}
                      height={64}
                      className="object-cover mx-auto"
                    />
                  </a>
                ) : null}
                {/* Documents */}
                {!content.contentType.startsWith("image") &&
                !content.contentType.startsWith("video") ? (
                  <a href={content.url} target="_blank">
                    <Image
                      src="/assets/icons/document.svg"
                      alt={content.filename}
                      width={64}
                      height={64}
                      className="object-cover mx-auto"
                    />
                  </a>
                ) : null}
              </div>
              {/* File Name */}
              <h3 className="text-sm py-2 truncate text-center">
                {content.filename}
              </h3>
            </div>
          ))}
        </div>
      ) : (
        <NoResult message="Sorry! No Media Found" />
      )}
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
  );
};

export {MediaContentWrapper};
