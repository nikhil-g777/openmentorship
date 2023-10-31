"use client";

import {getReview} from "@/endpoints/review";
import {useChatStore, useProfileStore} from "@/zustand/store";
import {useSession} from "next-auth/react";
import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";

const ReviewBanner = () => {
  const session = useSession();
  const token = session?.data?.user?.token;
  const chatType = useSearchParams().get("type");
  const {setMentorReviewModal} = useProfileStore();
  const {currentChatData} = useChatStore();
  const [reviewData, setReviewData] = useState<null | {
    [key: string]: string | number | null | object;
  }>(null);

  // Fetch review data
  useEffect(() => {
    if (token && currentChatData?.matches?.latestSession?._id) {
      getReview(token, currentChatData?.matches?.latestSession?._id).then(
        res => {
          if (res.success && res.review) {
            setReviewData(res.review);
          }
        }
      );
    }
  }, [token, currentChatData?.matches?.latestSession?._id]);

  const reviewBanner =
    currentChatData &&
    currentChatData?.matches?.status === "closed" &&
    currentChatData?.matches?.latestSession?._id &&
    currentChatData.userType === "mentor" &&
    reviewData !== null &&
    reviewData?.rating === null &&
    chatType === "archive";

  return (
    <>
      {reviewBanner ? (
        <div className="mx-4">
          <div className="w-full p-4 bg-primary flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 mt-4 rounded-lg">
            {/* Typography */}
            <div className="">
              <p className="text-base font-semibold">
                Rate your mentorship session!
              </p>
              <p className="text-sm">Leave a review for your mentor.</p>
            </div>
            {/* Rate Session Button */}
            <button
              className="w-fit btn btn-sm rounded-full normal-case bg-slate-200 text-black border-none lg:btn-md hover:text-white"
              onClick={() => setMentorReviewModal(true)}
            >
              Review Session
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export {ReviewBanner};
