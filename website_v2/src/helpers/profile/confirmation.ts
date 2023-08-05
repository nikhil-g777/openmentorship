import {updateMatches} from "@/endpoints/matches";
import {PerformConfirmationAction} from "@/types/profile";

// Perform Confirmation Action
const performConfirmationAction = async ({
  currentPage,
  confirmationButtonText,
  setConfirmationText,
  setLoading,
  chatId,
  token,
  setSuccessAlert,
  setErrorAlert,
  router,
}: PerformConfirmationAction) => {
  // End Session
  if (
    currentPage === "matches" &&
    confirmationButtonText === "End Session" &&
    chatId &&
    chatId.length &&
    token &&
    token.length
  ) {
    setLoading(true);
    const res = await updateMatches(
      chatId,
      "closed",
      "I want to end this session.",
      token
    );
    setLoading(false);
    if (!res.success && setErrorAlert) {
      setErrorAlert(res.error, 6);
    }
    if (res.success && setSuccessAlert) {
      setConfirmationText("");
      setSuccessAlert("You have ended the session!", 6);
      router.push("/matches?tab=closed");
      router.refresh();
    }
  }

  // Withdraw Request
  if (
    currentPage === "matches" &&
    confirmationButtonText === "Withdraw Request" &&
    chatId &&
    chatId.length &&
    token &&
    token.length
  ) {
    setLoading(true);
    if (chatId && token) {
      const res = await updateMatches(
        chatId,
        "closed",
        "I want to close.",
        token
      );
      setLoading(false);
      if (!res.success && setErrorAlert) {
        setErrorAlert(res.error, 6);
      }
      if (res.success && setSuccessAlert) {
        setConfirmationText("");
        setSuccessAlert("Your request has been withdrawn!", 6);
        router.push("/matches?tab=active");
        router.refresh();
      }
    }
  }

  // Approve Request
  if (
    currentPage === "matches" &&
    confirmationButtonText === "Approve Request" &&
    chatId &&
    chatId.length &&
    token &&
    token.length
  ) {
    setLoading(true);
    if (chatId && token) {
      const res = await updateMatches(chatId, "active", "Let's connect", token);
      setLoading(false);
      if (!res.success && setErrorAlert) {
        setErrorAlert(res.error, 6);
      }
      if (res.success && setSuccessAlert) {
        setConfirmationText("");
        setSuccessAlert("You have approved the request!", 6);
        router.push("/matches?tab=active");
        router.refresh();
      }
    }
  }

  // Decline Request
  if (
    currentPage === "matches" &&
    confirmationButtonText === "Decline Request" &&
    chatId &&
    chatId.length &&
    token &&
    token.length
  ) {
    setLoading(true);
    const res = await updateMatches(
      chatId,
      "closed",
      "Sorry, Can't accept.",
      token
    );
    setLoading(false);
    if (!res.success && setErrorAlert) {
      setErrorAlert(res.error, 6);
    }
    if (res.success && setSuccessAlert) {
      setConfirmationText("");
      setSuccessAlert("You have declined the request!", 6);
      router.push("/matches?tab=active");
      router.refresh();
    }
  }
};

// Get Confirmation Button Text
const getConfirmationButtonText = (
  confirmationText: string,
  loading: boolean
) => {
  if (
    confirmationText ===
      "Are you sure that you would like to end the session?" &&
    !loading
  ) {
    return "End Session";
  }
  if (
    confirmationText ===
      "Are you sure that you would like to end the session?" &&
    loading
  ) {
    return "Ending Session...";
  }
  if (
    confirmationText ===
      "Are you sure that you would like to decline the request?" &&
    !loading
  ) {
    return "Decline Request";
  }
  if (
    confirmationText ===
      "Are you sure that you would like to decline the request?" &&
    loading
  ) {
    return "Declining...";
  }
  if (
    confirmationText === "Are you sure you want to withdraw your request?" &&
    !loading
  ) {
    return "Withdraw Request";
  }
  if (
    confirmationText === "Are you sure you want to withdraw your request?" &&
    loading
  ) {
    return "Withdrawing...";
  }
  if (
    confirmationText === "Are you sure you want to approve this request?" &&
    !loading
  ) {
    return "Approve Request";
  }
  if (
    confirmationText === "Are you sure you want to approve this request?" &&
    loading
  ) {
    return "Approving...";
  }

  return "";
};

export {performConfirmationAction, getConfirmationButtonText};
