"use client";

import {
  getConfirmationButtonText,
  performConfirmationAction,
} from "@/helpers/profile/confirmation";
import {useCommonStore, useProfileStore} from "@/zustand/store";
import {useRouter} from "next/navigation";

const ConfirmationModal = () => {
  const router = useRouter();
  const {
    currentPage,
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
              className={`btn rounded-full btn-sm text-sm capitalize btn-outline ${
                confirmationButtonText === "Approve Request" ||
                confirmationButtonText === "Approve Account" ||
                confirmationButtonText === "Enable Account"
                  ? "btn-accent"
                  : "btn-error"
              }`}
              onClick={handleEndSession}
              disabled={loading}
            >
              {confirmationButtonText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export {ConfirmationModal};
