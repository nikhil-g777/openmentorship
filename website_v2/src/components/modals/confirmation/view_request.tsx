import {performConfirmationAction} from "@/helpers/profile/confirmation";
import {useCommonStore, useProfileStore} from "@/zustand/store";
import {useRouter} from "next/navigation";
import {useState} from "react";

// Types
type RequestLoading = {
  approve: boolean;
  decline: boolean;
};

const ViewRequest = () => {
  const router = useRouter();
  const {
    currentPage,
    firstName,
    setLoading,
    token,
    chatId,
    confirmationText,
    setConfirmationText,
  } = useProfileStore();
  const {setSuccessAlert, setErrorAlert} = useCommonStore();
  const [requestLoading, setRequestLoading] = useState<RequestLoading>({
    approve: false,
    decline: false,
  });
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
    <div className="modal-box relative">
      {/* Close */}
      <button
        onClick={() => setConfirmationText("")}
        disabled={requestLoading.approve || requestLoading.decline}
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
          disabled={requestLoading.approve || requestLoading.decline}
        >
          {requestLoading.approve ? "Approving..." : "Approve Request"}
        </button>
        <button
          className={`btn rounded-full btn-sm text-sm capitalize btn-outline btn-error ${
            requestLoading.decline ? "loading" : ""
          }`}
          onClick={() => handleMentorConfirmation("Decline Request")}
          disabled={requestLoading.approve || requestLoading.decline}
        >
          {requestLoading.decline ? "Declining..." : "Decline Request"}
        </button>
      </div>
    </div>
  );
};

export {ViewRequest};
