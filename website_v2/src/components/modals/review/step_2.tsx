"use client";

import {ERROR_ALERT, SUCCESS_ALERT} from "@/constants/common";
import {addReview} from "@/endpoints/review";
import {useCommonStore, useProfileStore} from "@/zustand/store";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import {Dispatch, SetStateAction, useState} from "react";

type Props = {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
};

const Step2 = ({currentStep, setCurrentStep}: Props) => {
  const session = useSession();
  const token = session?.data?.user?.token;
  const {
    mentorRating,
    mentorReview,
    mentorPersonalNote,
    setMentorPersonalNote,
  } = useProfileStore();
  const {setSuccessAlert, setErrorAlert} = useCommonStore();
  const [loading, setLoading] = useState<boolean>(false);

  // Handle submit
  const handleSubmit = async () => {
    // Go to step 1 if rating and review is empty
    if (mentorRating === 0 && mentorReview === "") {
      setCurrentStep(1);
      return;
    }

    // Move to landing page if token is not available
    if (!token) {
      redirect("/");
    }

    const review = {
      rating: mentorRating,
      review: mentorReview,
      personalNote: mentorPersonalNote,
    };

    // Perform submit
    setLoading(true);
    const response = await addReview(token, review);
    if (response.success) {
      setSuccessAlert(SUCCESS_ALERT.REVIEW_SUBMITTED, 6);
      setLoading(false);
      setCurrentStep(3);
    } else {
      setErrorAlert(ERROR_ALERT.REVIEW_SUBMIT_ERROR, 6);
      setLoading(false);
    }
  };

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
        onChange={e => setMentorPersonalNote(e.target.value)}
        value={mentorPersonalNote}
      ></textarea>

      <div className="modal-action mt-auto">
        <button
          className="btn rounded-full btn-primary btn-sm text-sm capitalize px-4"
          onClick={() => setCurrentStep(1)}
        >
          Previous
        </button>
        <button
          className={`btn rounded-full btn-primary btn-sm text-sm capitalize px-8 ${
            loading ? "loading" : ""
          }`}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export {Step2};
