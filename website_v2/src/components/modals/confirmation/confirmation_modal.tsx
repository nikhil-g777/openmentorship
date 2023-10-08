"use client";

import {
  getConfirmationButtonText,
  performConfirmationAction,
} from "@/helpers/profile/confirmation";
import {useCommonStore, useProfileStore} from "@/zustand/store";
import {useRouter} from "next/navigation";
import {ViewRequest} from "./view_request";
import {PAGES, TABS, USER_TYPE} from "@/constants/common";

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
  const confirmationButtonText = getConfirmationButtonText(
    confirmationText,
    loading
  );

  // isViewRequest
  const isViewRequest =
    currentPage === PAGES.MATCHES &&
    currentTab === TABS.MATCHES.PENDING &&
    userType === USER_TYPE.MENTOR;

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
        {/* View Request */}
        {isViewRequest ? <ViewRequest /> : null}

        {/* Confirmation Container */}
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
