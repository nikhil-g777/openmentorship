import {NoResult} from "@/components/noResult/no_result";
import {MediaContent} from "@/types/chat";
import Image from "next/image";
import {MutableRefObject} from "react";

type Props = {
  mediaContentContainer: MutableRefObject<HTMLDivElement | null>;
  mediaContent: MediaContent;
  handleError: (sid: string) => void;
  loader: boolean;
  setChatMediaContentModal: (chatMediaContentModal: boolean) => void;
};

const MediaContentWrapper = ({
  mediaContentContainer,
  mediaContent,
  handleError,
  loader,
  setChatMediaContentModal,
}: Props) => {
  return (
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
  );
};

export {MediaContentWrapper};
