"use client";

import {Dispatch, SetStateAction, useState} from "react";

type Props = {
  setCurrentStep: Dispatch<SetStateAction<number>>;
};

const Step1 = ({setCurrentStep}: Props) => {
  const [rating, setRating] = useState<number>(0);

  return (
    <div className="w-full">
      {/* Heading */}
      <h3 className="text-lg my-4 font-semibold">Create a public review</h3>
      {/* Rating */}
      <h4 className="text-sm mt-4 mb-2">Overall Rating</h4>
      <div className="rating rating-lg">
        <input
          type="radio"
          name="rating-8"
          className="rating-hidden hidden"
          checked={rating === 0}
          readOnly
        />
        <input
          type="radio"
          name="rating-8"
          className="mask mask-star-2 bg-orange-400"
          onClick={() => setRating(1)}
        />
        <input
          type="radio"
          name="rating-8"
          className="mask mask-star-2 bg-orange-400"
          onClick={() => setRating(2)}
        />
        <input
          type="radio"
          name="rating-8"
          className="mask mask-star-2 bg-orange-400"
          onClick={() => setRating(3)}
        />
        <input
          type="radio"
          name="rating-8"
          className="mask mask-star-2 bg-orange-400"
          onClick={() => setRating(4)}
        />
        <input
          type="radio"
          name="rating-8"
          className="mask mask-star-2 bg-orange-400"
          onClick={() => setRating(5)}
        />
      </div>
      {/* Review post */}
      <h4 className="text-sm mt-4 mb-2">Write a review post</h4>
      <textarea
        placeholder="Your review..."
        className="textarea textarea-bordered textarea-lg px-4 text-base w-full max-h-48 min-h-[128px]"
      ></textarea>

      <div className="modal-action">
        <button
          className="btn rounded-full btn-primary btn-sm text-sm capitalize px-8"
          onClick={() => setCurrentStep(2)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export {Step1};
