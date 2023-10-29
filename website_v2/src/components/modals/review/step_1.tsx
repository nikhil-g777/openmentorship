"use client";

import {useProfileStore} from "@/zustand/store";
import {Dispatch, SetStateAction} from "react";

type Props = {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
};

const Step1 = ({currentStep, setCurrentStep}: Props) => {
  const {mentorRating, mentorReview, setMentorRating, setMentorReview} =
    useProfileStore();

  return (
    <div className={`w-full ${currentStep === 1 ? "" : "hidden"}`}>
      {/* Heading */}
      <h3 className="text-lg my-4 font-semibold">Create a public review</h3>
      {/* Rating */}
      <h4 className="text-sm mt-4 mb-2">Overall Rating</h4>
      <div className="rating rating-lg">
        <input
          type="radio"
          name="rating-8"
          className="rating-hidden hidden"
          checked={mentorRating === 0}
          readOnly
        />
        <input
          type="radio"
          name="rating-8"
          className="mask mask-star-2 bg-primary"
          onClick={() => setMentorRating(1)}
        />
        <input
          type="radio"
          name="rating-8"
          className="mask mask-star-2 bg-primary"
          onClick={() => setMentorRating(2)}
        />
        <input
          type="radio"
          name="rating-8"
          className="mask mask-star-2 bg-primary"
          onClick={() => setMentorRating(3)}
        />
        <input
          type="radio"
          name="rating-8"
          className="mask mask-star-2 bg-primary"
          onClick={() => setMentorRating(4)}
        />
        <input
          type="radio"
          name="rating-8"
          className="mask mask-star-2 bg-primary"
          onClick={() => setMentorRating(5)}
        />
      </div>
      {/* Review post */}
      <h4 className="text-sm mt-4 mb-2">Write a review post</h4>
      <textarea
        placeholder="Your review..."
        className="textarea textarea-bordered textarea-lg px-4 text-base w-full max-h-48 min-h-[128px]"
        onChange={e => setMentorReview(e.target.value)}
        value={mentorReview}
      ></textarea>

      <div className="modal-action">
        <button
          className="btn rounded-full btn-primary btn-sm text-sm capitalize px-8"
          onClick={() => setCurrentStep(2)}
          disabled={mentorRating === 0 || mentorReview === ""}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export {Step1};
