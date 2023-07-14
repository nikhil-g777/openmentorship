"use client";

import {getButtonText, performProfileAction} from "@/helpers/profile";
import {useCommonStore, useProfileStore} from "@/zustand/store";
import {useRouter} from "next/navigation";
import React, {useState} from "react";

const ProfileCardModal = () => {
  const router = useRouter();
  const {
    token,
    firstName,
    currentPage,
    currentTab,
    isProfileModal,
    setIsProfileModal,
    userType,
    menteeId,
    mentorId,
    loading,
    setLoading,
  } = useProfileStore();
  const {setSuccessAlert, setErrorAlert} = useCommonStore();
  const buttonText = getButtonText({currentPage, currentTab, userType});
  const [message, setMessage] = useState<string>("");

  // Handle profile action
  const handleProfileAction = () => {
    // Perform action
    performProfileAction({
      currentPage,
      currentTab,
      router,
      setIsProfileModal,
      buttonText,
      setLoading,
      token,
      menteeId,
      mentorId,
      message,
      setSuccessAlert,
      setErrorAlert,
    });
  };

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
          isProfileModal ? "modal-open" : ""
        }`}
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Send a Request to <b>{firstName}</b>
          </h3>
          <p className="pb-4 text-sm">
            Let <b>{firstName}</b> know why you want them as your mentor.
          </p>
          <textarea
            placeholder="Your message..."
            className="textarea textarea-bordered textarea-md w-full h-48 resize-none"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setMessage(e.target.value)
            }
            value={message}
          ></textarea>
          <div className="modal-action">
            <button
              className="btn rounded-full btn-sm text-sm capitalize btn-outline btn-error"
              onClick={() => setIsProfileModal(false)}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className="btn rounded-full btn-sm text-sm capitalize btn-accent px-8"
              onClick={handleProfileAction}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export {ProfileCardModal};
