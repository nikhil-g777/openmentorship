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
        className="flex flex-wrap justify-stretch gap-4 overflow-y-auto max-h-96"
        ref={mediaContentContainer}
      >
        {mediaContent && mediaContent.length ? (
          mediaContent.map(content => (
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
                      onError={() => handleError(content.sid)}
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
