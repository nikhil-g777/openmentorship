import {CONFIRMATION_PROMPTS} from "@/constants/admin/dashboard";
import {PAGES, SUCCESS_ALERT} from "@/constants/common";
import {updateMentorRegistration} from "@/endpoints/admin";
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
    (currentPage === PAGES.MATCHES || currentPage === PAGES.CHAT) &&
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
      setSuccessAlert(SUCCESS_ALERT.SESSION_ENDED, 6);
      if (currentPage === PAGES.CHAT) {
        router.push("/chat");
        router.refresh();
      } else {
        router.push("/matches?tab=closed");
        router.refresh();
      }
    }
  }

  // Withdraw Request
  if (
    currentPage === PAGES.MATCHES &&
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
        setSuccessAlert(SUCCESS_ALERT.REQUEST_WITHDRAWN, 6);
        router.push("/matches?tab=active");
        router.refresh();
      }
    }
  }

  // Approve Request
  if (
    currentPage === PAGES.MATCHES &&
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
        setSuccessAlert(SUCCESS_ALERT.REQUEST_APPROVED, 6);
        router.push("/matches?tab=active");
        router.refresh();
      }
    }
  }

  // Decline Request
  if (
    currentPage === PAGES.MATCHES &&
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
      setSuccessAlert(SUCCESS_ALERT.REQUEST_DECLINED, 6);
      router.push("/matches?tab=active");
      router.refresh();
    }
  }

  // Approve Account / Enable Account (Admin Dashboard)
  if (
    currentPage === PAGES.ADMIN.DASHBOARD &&
    (confirmationButtonText === "Approve Account" ||
      confirmationButtonText === "Enable Account") &&
    chatId &&
    chatId.length &&
    token &&
    token.length
  ) {
    setLoading(true);
    const res = await updateMentorRegistration(token, chatId, "complete");
    setLoading(false);
    if (!res.success && setErrorAlert) {
      setErrorAlert(res.error, 6);
    }
    if (res.success && setSuccessAlert) {
      setConfirmationText("");
      setSuccessAlert(SUCCESS_ALERT.ACCOUNT_APPROVED, 6);
      router.refresh();
    }
  }

  // Deny Account (Admin Dashboard)
  if (
    currentPage === PAGES.ADMIN.DASHBOARD &&
    confirmationButtonText === "Deny Account" &&
    chatId &&
    chatId.length &&
    token &&
    token.length
  ) {
    setLoading(true);
    const res = await updateMentorRegistration(token, chatId, "denied");
    setLoading(false);
    if (!res.success && setErrorAlert) {
      setErrorAlert(res.error, 6);
    }
    if (res.success && setSuccessAlert) {
      setConfirmationText("");
      setSuccessAlert(SUCCESS_ALERT.ACCOUNT_DENIED, 6);
      router.refresh();
    }
  }

  // Disable Account (Admin Dashboard)
  if (
    currentPage === PAGES.ADMIN.DASHBOARD &&
    confirmationButtonText === "Disable Account" &&
    chatId &&
    chatId.length &&
    token &&
    token.length
  ) {
    setLoading(true);
    const res = await updateMentorRegistration(token, chatId, "disabled");
    setLoading(false);
    if (!res.success && setErrorAlert) {
      setErrorAlert(res.error, 6);
    }
    if (res.success && setSuccessAlert) {
      setConfirmationText("");
      setSuccessAlert(SUCCESS_ALERT.DISABLE_ACCOUNT, 6);
      router.refresh();
    }
  }
};

// Get Confirmation Button Text
const getConfirmationButtonText = (
  confirmationText: string,
  loading: boolean
) => {
  switch (confirmationText) {
    case CONFIRMATION_PROMPTS.END_SESSION:
      return loading ? "Ending Session..." : "End Session";
    case CONFIRMATION_PROMPTS.DECLINE_REQUEST:
      return loading ? "Declining..." : "Decline Request";
    case CONFIRMATION_PROMPTS.WITHDRAW_REQUEST:
      return loading ? "Withdrawing..." : "Withdraw Request";
    case CONFIRMATION_PROMPTS.APPROVE_REQUEST:
      return loading ? "Approving..." : "Approve Request";
    case CONFIRMATION_PROMPTS.APPROVE_ACCOUNT:
      return loading ? "Approving..." : "Approve Account";
    case CONFIRMATION_PROMPTS.DENY_ACCOUNT:
      return loading ? "Denying..." : "Deny Account";
    case CONFIRMATION_PROMPTS.DISABLE_ACCOUNT:
      return loading ? "Disabling..." : "Disable Account";
    case CONFIRMATION_PROMPTS.ENABLE_ACCOUNT:
      return loading ? "Enabling..." : "Enable Account";
    default:
      return "";
  }
};

export {performConfirmationAction, getConfirmationButtonText};
