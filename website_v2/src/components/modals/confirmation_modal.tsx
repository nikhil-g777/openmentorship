"use client";

import {
  getSecondaryButtonText,
  performSecondaryButtonAction,
} from "@/helpers/profile";
import {useCommonStore, useProfileStore} from "@/zustand/store";
import {useRouter} from "next/navigation";

const ConfirmationModal = () => {
  const router = useRouter();
  const {
    currentPage,
    currentTab,
    userType,
    loading,
    setLoading,
    token,
    chatId,
    confirmationText,
    setConfirmationText,
  } = useProfileStore();
  const {setSuccessAlert, setErrorAlert} = useCommonStore();
  const secondaryButtonText = getSecondaryButtonText({
    currentPage,
    currentTab,
    userType,
  });

  const handleEndSession = async () => {
    performSecondaryButtonAction({
      currentPage,
      currentTab,
      router,
      secondaryButtonText,
      setLoading,
      token,
      chatId,
      confirmationText,
      setConfirmationText,
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
          confirmationText && confirmationText.length ? "modal-open" : ""
        }`}
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg py-8">{confirmationText}</h3>
          <div className="modal-action">
            <button
              className="btn rounded-full btn-sm text-sm capitalize btn-accent px-8"
              onClick={() => setConfirmationText("")}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className="btn rounded-full btn-sm text-sm capitalize btn-outline btn-error"
              onClick={handleEndSession}
              disabled={loading}
            >
              {loading ? "Ending Session..." : "End Session"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export {ConfirmationModal};
