"use client";

import {useProfileStore} from "@/zustand/store";
import {useState} from "react";
import {Step1} from "./step_1";
import {Step2} from "./step_2";
import {Step3} from "./step_3";

const MentorReviewModal = () => {
  const {mentorReviewModal} = useProfileStore();
  const [currentStep, setCurrentStep] = useState<number>(1);

  return (
    <>
      {/* The button to open modal */}
      <label htmlFor="my-modal-6" className="btn w-0 h-0 hidden">
        open modal
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div
        className={`modal modal-bottom sm:modal-middle ${
          mentorReviewModal ? "modal-open" : ""
        }`}
      >
        {/* Confirmation Container */}
        <div className="modal-box min-h-[460px]">
          <h2 className="font-bold text-xl">
            {currentStep === 1 ? "Step 1" : currentStep === 2 ? "Step 2" : null}
          </h2>

          {/* Progess Bar */}
          <div
            className={`h-2 bg-primary mt-2 rounded-md transition duration-100 ${
              currentStep === 1 ? "w-2/4" : "w-full"
            }`}
          ></div>

          {/* Step 1 */}
          <Step1 currentStep={currentStep} setCurrentStep={setCurrentStep} />
          {/* Step 2 */}
          <Step2 currentStep={currentStep} setCurrentStep={setCurrentStep} />
          {/* Step 3 */}
          <Step3 currentStep={currentStep} />
        </div>
      </div>
    </>
  );
};

export {MentorReviewModal};
