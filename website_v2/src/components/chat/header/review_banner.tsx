"use client";

import {getReviews} from "@/endpoints/review";
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
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch review data
  useEffect(() => {
    setLoading(true);
    if (token && currentChatData?.matches?.latestSession?._id) {
      getReviews(
        token,
        1,
        10,
        "",
        currentChatData?.matches?.latestSession?._id
      ).then(res => {
        setLoading(false);
        if (res.success && res.reviews && res.reviews.length > 0) {
          setReviewData(res.reviews);
        }
      });
    }
  }, [token, currentChatData?.matches?.latestSession?._id, setLoading]);

  // Check if review banner should be shown
  const reviewBanner =
    currentChatData &&
    currentChatData?.matches?.status === "closed" &&
    currentChatData?.matches?.latestSession?._id &&
    currentChatData.userType === "mentor" &&
    reviewData === null &&
    chatType === "archive";

  return (
    <>
      {reviewBanner && !loading ? (
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
