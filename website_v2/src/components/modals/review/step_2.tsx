"use client";

import {Dispatch, SetStateAction} from "react";

type Props = {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
};

const Step2 = ({currentStep, setCurrentStep}: Props) => {
  return (
    <div
      className={`w-full min-h-[368px] flex flex-col ${
        currentStep === 2 ? "" : "hidden"
      }`}
    >
      {/* Heading */}
      <h3 className="text-lg my-4 font-semibold">
        Write a personal note to the mentor
      </h3>
      {/* Review post */}
      <h4 className="text-sm mt-4 mb-2">
        Offer suggestion or say thanks to your mentor. We won&apos;t post your
        note to the mentor&apos;s profile.
      </h4>
      <textarea
        placeholder="Add a private note (optional)"
        className="textarea textarea-bordered textarea-lg px-4 text-base w-full max-h-48 min-h-[128px]"
      ></textarea>

      <div className="modal-action mt-auto">
        <button
          className="btn rounded-full btn-primary btn-sm text-sm capitalize px-4"
          onClick={() => setCurrentStep(1)}
        >
          Previous
        </button>
        <button
          className="btn rounded-full btn-primary btn-sm text-sm capitalize px-8"
          onClick={() => setCurrentStep(3)}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export {Step2};
