"use client";

import {useProfileStore} from "@/zustand/store";

const ReviewBanner = () => {
  const {setMentorReviewModal} = useProfileStore();

  return (
    <div className="w-full p-4 bg-primary flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
      {/* Typography */}
      <div className="text-base-100">
        <p className="text-base font-semibold">Rate your mentorship session!</p>
        <p className="text-sm">Leave a review for your mentor.</p>
      </div>
      {/* Rate Session Button */}
      <button
        className="w-fit btn btn-sm rounded-full normal-case"
        onClick={() => setMentorReviewModal(true)}
      >
        Rate Session
      </button>
    </div>
  );
};

export {ReviewBanner};
