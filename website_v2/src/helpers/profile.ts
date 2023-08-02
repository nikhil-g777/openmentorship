import {createMatch, updateMatches} from "@/endpoints/matches";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context";

// Button args type
type buttonArgs = {
  currentPage: string;
  currentTab: string;
  userType: string;
};

const getButtonText = ({currentPage, currentTab, userType}: buttonArgs) => {
  // Mentee's
  if (currentPage === "explore" && userType === "mentee") {
    return "Send Request";
  }
  if (
    currentPage === "matches" &&
    userType === "mentee" &&
    (currentTab === "active" || currentTab === "" || !currentTab)
  ) {
    return "Chat";
  }
  if (
    currentPage === "matches" &&
    userType === "mentee" &&
    currentTab === "pending"
  ) {
    return "Withdraw Request";
  }
  if (
    currentPage === "matches" &&
    userType === "mentee" &&
    currentTab === "closed"
  ) {
    return "Reconnect";
  }

  // Mentor's
  if (
    currentPage === "matches" &&
    userType === "mentor" &&
    (currentTab === "active" || currentTab === "" || !currentTab)
  ) {
    return "Chat";
  }
  if (
    currentPage === "matches" &&
    userType === "mentor" &&
    currentTab === "pending"
  ) {
    return "Approve Request";
  }
  if (
    currentPage === "matches" &&
    userType === "mentor" &&
    currentTab === "closed"
  ) {
    return "Archived Chat";
  }

  // Return empty string
  return "";
};

const getSecondaryButtonText = ({
  currentPage,
  currentTab,
  userType,
}: buttonArgs) => {
  // Mentee
  if (
    currentPage === "matches" &&
    currentTab === "closed" &&
    userType === "mentee"
  ) {
    return "Archived Chat";
  }

  if (
    currentPage === "matches" &&
    (currentTab === "active" || currentTab === "" || !currentTab) &&
    userType === "mentee"
  ) {
    return "End Session";
  }

  // Mentor
  if (
    currentPage === "matches" &&
    (currentTab === "active" || currentTab === "" || !currentTab) &&
    userType === "mentor"
  ) {
    return "End Session";
  }

  if (
    currentPage === "matches" &&
    currentTab === "pending" &&
    userType === "mentor"
  ) {
    return "Decline Request";
  }

  // Return null if none of the above matches
  return "";
};

// Profile action type
type PerformProfileAction = {
  currentPage: string;
  currentTab: string;
  router: AppRouterInstance;
  chatId?: string;
  buttonText?: string;
  secondaryButtonText?: string;
  setLoading: (type: boolean) => void;
  token: string;
  isProfileModal?: boolean;
  setIsProfileModal?: (type: boolean) => void;
  message?: string;
  menteeId?: string;
  mentorId?: string;
  confirmationText?: string;
  setConfirmationText?: (confirmationText: string) => void;
  setSuccessAlert?: (successAlert: string, time: number) => void;
  setErrorAlert?: (errorAlert: string, time: number) => void;
};
const performProfileAction = async ({
  currentPage,
  currentTab,
  router,
  chatId,
  buttonText,
  setLoading,
  token,
  isProfileModal,
  setIsProfileModal,
  confirmationText,
  setConfirmationText,
  message,
  menteeId,
  mentorId,
  setSuccessAlert,
  setErrorAlert,
}: PerformProfileAction) => {
  // Chat
  if (
    currentPage === "matches" &&
    (currentTab === "active" || currentTab === "" || !currentTab) &&
    buttonText === "Chat"
  ) {
    router.push("/chat?id=" + chatId);
  }

  // Withdraw Request (Open Modal)
  if (
    currentPage === "matches" &&
    currentTab === "pending" &&
    buttonText === "Withdraw Request" &&
    !confirmationText &&
    setConfirmationText
  ) {
    setConfirmationText("Are you sure you want to withdraw your request?");
  }

  // Withdraw Request
  if (
    currentPage === "matches" &&
    currentTab === "pending" &&
    buttonText === "Withdraw Request" &&
    confirmationText &&
    confirmationText.length &&
    setConfirmationText
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
      }
    }
  }

  // Reconnect (Open Modal)
  if (
    !isProfileModal &&
    setIsProfileModal &&
    currentPage === "matches" &&
    currentTab === "closed" &&
    buttonText === "Reconnect"
  ) {
    setIsProfileModal(true);
  }

  // Reconnect
  if (
    isProfileModal &&
    setIsProfileModal &&
    currentPage === "matches" &&
    currentTab === "closed" &&
    buttonText === "Reconnect" &&
    chatId &&
    chatId.length &&
    token &&
    token.length
  ) {
    setLoading(true);
    const res = await updateMatches(
      chatId,
      "active",
      message || "I want to reconnect",
      token
    );
    setLoading(false);
    if (!res.success && setErrorAlert) {
      setErrorAlert(res.error, 6);
    }
    if (res.success && setSuccessAlert) {
      setIsProfileModal(false);
      setSuccessAlert("Your request has been sent!", 6);
      router.push("/matches?tab=active");
    }
  }

  // Send Request (Open Modal)
  if (
    !isProfileModal &&
    setIsProfileModal &&
    currentPage === "explore" &&
    buttonText === "Send Request"
  ) {
    setIsProfileModal(true);
  }

  // Send Request
  if (
    isProfileModal &&
    setIsProfileModal &&
    currentPage === "explore" &&
    buttonText === "Send Request" &&
    menteeId &&
    menteeId.length &&
    mentorId &&
    mentorId.length &&
    token &&
    token.length
  ) {
    setLoading(true);
    const res = await createMatch(
      menteeId,
      mentorId,
      message || "I want help.",
      token
    );
    setLoading(false);
    if (!res.success && setErrorAlert) {
      setIsProfileModal(false);
      setErrorAlert(res.error, 6);
    }
    if (res.success && setSuccessAlert) {
      setIsProfileModal(false);
      setSuccessAlert("Your request has been sent!", 6);
    }
  }

  // Approve Request
  if (
    currentPage === "matches" &&
    currentTab === "pending" &&
    buttonText === "Approve Request"
  ) {
    setLoading(true);
    if (chatId && token) {
      const res = await updateMatches(chatId, "active", "Let's connect", token);
      setLoading(false);
      if (!res.success && setErrorAlert) {
        setErrorAlert(res.error, 6);
      }
      if (res.success && setSuccessAlert) {
        setSuccessAlert("You have approved the request!", 6);
      }
    }
  }

  // Archived Chat
  if (
    currentPage === "matches" &&
    currentTab === "closed" &&
    buttonText === "Archived Chat"
  ) {
    router.push("/chat?id=" + chatId + "&type=archive");
  }
};

const performSecondaryButtonAction = async ({
  currentPage,
  currentTab,
  router,
  chatId,
  secondaryButtonText,
  setLoading,
  token,
  confirmationText,
  setConfirmationText,
  setSuccessAlert,
  setErrorAlert,
}: PerformProfileAction) => {
  // End Session (Modal)
  if (
    currentPage === "matches" &&
    currentTab === "active" &&
    secondaryButtonText === "End Session" &&
    setConfirmationText &&
    confirmationText === ""
  ) {
    setConfirmationText("Are you sure that you would like to end the session?");
  }

  // End Session
  if (
    currentPage === "matches" &&
    currentTab === "active" &&
    secondaryButtonText === "End Session" &&
    confirmationText &&
    confirmationText.length &&
    setConfirmationText &&
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
    }
  }

  // Decline Request (Modal)
  if (
    currentPage === "matches" &&
    currentTab === "pending" &&
    secondaryButtonText === "Decline Request" &&
    setConfirmationText &&
    confirmationText === ""
  ) {
    setConfirmationText(
      "Are you sure that you would like to decline the request?"
    );
  }

  // Decline Request
  if (
    currentPage === "matches" &&
    currentTab === "pending" &&
    secondaryButtonText === "Decline Request" &&
    confirmationText &&
    confirmationText.length &&
    setConfirmationText &&
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
    }
  }

  // Archived Chat
  if (
    currentPage === "matches" &&
    currentTab === "closed" &&
    secondaryButtonText === "Archived Chat"
  ) {
    router.push("/chat?id=" + chatId + "&type=archive");
  }
};

const getButtonColor = (buttonText: string) => {
  if (
    buttonText === "Send Request" ||
    buttonText === "Chat" ||
    buttonText === "Reconnect" ||
    buttonText === "Approve Request"
  ) {
    return "btn-accent";
  } else if (buttonText === "Withdraw Request") {
    return "btn-outline btn-error";
  } else return "btn-outline";
};

const getSecondaryButtonColor = (
  secondaryButtonText: string | undefined | null
) => {
  if (
    secondaryButtonText === "End Session" ||
    secondaryButtonText === "Decline Request"
  ) {
    return "btn-outline btn-error";
  } else return "btn-outline";
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

  return "";
};

export {
  getButtonText,
  getSecondaryButtonText,
  performProfileAction,
  performSecondaryButtonAction,
  getButtonColor,
  getSecondaryButtonColor,
  getConfirmationButtonText,
};
