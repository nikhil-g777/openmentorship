"use client";

import {
  getConfirmationButtonText,
  performConfirmationAction,
} from "@/helpers/profile/confirmation";
import {useCommonStore, useProfileStore} from "@/zustand/store";
import {useRouter} from "next/navigation";
import {useState} from "react";

// Types
type RequestLoading = {
  approve: boolean;
  decline: boolean;
};

const ConfirmationModal = () => {
  const router = useRouter();
  const {
    currentPage,
    currentTab,
    userType,
    firstName,
    loading,
    setLoading,
    token,
    chatId,
    confirmationText,
    setConfirmationText,
  } = useProfileStore();
  const {setSuccessAlert, setErrorAlert} = useCommonStore();
  const confirmationButtonText = getConfirmationButtonText(
    confirmationText,
    loading
  );
  const [requestLoading, setRequestLoading] = useState<RequestLoading>({
    approve: false,
    decline: false,
  });

  // isViewRequest
  const isViewRequest =
    currentPage === "matches" &&
    currentTab === "pending" &&
    userType === "mentor";

  const handleEndSession = async () => {
    await performConfirmationAction({
      currentPage,
      router,
      setLoading,
      token,
      chatId,
      confirmationButtonText,
      setConfirmationText,
      setSuccessAlert,
      setErrorAlert,
    });
  };

  // Handle Mentor Confirmation
  const handleMentorConfirmation = async (confirmationText: string) => {
    // Set loading
    setRequestLoading({
      approve: confirmationText === "Approve Request",
      decline: confirmationText === "Decline Request",
    });

    await performConfirmationAction({
      currentPage,
      router,
      setLoading,
      token,
      chatId,
      confirmationButtonText: confirmationText,
      setConfirmationText,
      setSuccessAlert,
      setErrorAlert,
    });

    // Reset loading
    setRequestLoading({
      approve: false,
      decline: false,
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
          confirmationText && confirmationText.length ? "modal-open" : ""
        }`}
      >
        {/* View Request */}
        {isViewRequest ? (
          <div className="modal-box relative">
            {/* Close */}
            <button
              onClick={() => setConfirmationText("")}
              disabled={loading}
              className="btn btn-sm btn-circle btn-ghost btn-active absolute right-2 top-2"
            >
              ✕
            </button>
            <h2 className="font-bold text-lg pt-4">
              {firstName}
              <span className="text-base font-normal mx-1">:</span>
            </h2>
            <h3 className="text-base">{confirmationText}</h3>
            <div className="modal-action mt-20">
              <button
                className={`btn rounded-full btn-sm text-sm capitalize btn-outline btn-accent ${
                  requestLoading.approve ? "loading" : ""
                }`}
                onClick={() => handleMentorConfirmation("Approve Request")}
                disabled={loading}
              >
                {requestLoading.approve ? "Approving..." : "Approve Request"}
              </button>
              <button
                className={`btn rounded-full btn-sm text-sm capitalize btn-outline btn-error ${
                  requestLoading.decline ? "loading" : ""
                }`}
                onClick={() => handleMentorConfirmation("Decline Request")}
                disabled={loading}
              >
                {requestLoading.decline ? "Declining..." : "Decline Request"}
              </button>
            </div>
          </div>
        ) : null}

        {/* Confirmation Modal */}
        {!isViewRequest ? (
          <div className="modal-box">
            <h3 className="font-bold text-lg py-8 text-center">
              {confirmationText}
            </h3>

            <div className="modal-action">
              <button
                className="btn rounded-full btn-sm text-sm capitalize btn-accent px-8"
                onClick={() => setConfirmationText("")}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className={`btn rounded-full btn-sm text-sm capitalize btn-outline ${
                  confirmationButtonText === "Approve Request" ||
                  confirmationButtonText === "Approve Account" ||
                  confirmationButtonText === "Enable Account"
                    ? "btn-accent"
                    : "btn-error"
                } ${loading ? "loading" : ""}`}
                onClick={handleEndSession}
                disabled={loading}
              >
                {confirmationButtonText}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export {ConfirmationModal};
