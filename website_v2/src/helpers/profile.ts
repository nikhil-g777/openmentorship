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

  // Mentor
  if (
    currentPage === "matches" &&
    currentTab === "active" &&
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
  return null;
};

// Profile action type
type PerformProfileAction = {
  currentPage: string;
  currentTab: string;
  router: AppRouterInstance;
  chatId?: string;
  buttonText: string;
  setLoading: (type: boolean) => void;
  token: string;
  setIsProfileModal?: (type: boolean) => void;
  message?: string;
  menteeId?: string;
  mentorId?: string;
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
  setIsProfileModal,
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
  // Withdraw Request
  if (
    currentPage === "matches" &&
    currentTab === "pending" &&
    buttonText === "Withdraw Request"
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
      if (!res.success && setIsProfileModal) {
        setIsProfileModal(res.error);
      }
      if (res.success && setSuccessAlert) {
        setSuccessAlert("Your request has been withdrawn!", 6);
      }
    }
  }

  // Reconnect (Open Modal)
  if (
    setIsProfileModal &&
    currentPage === "matches" &&
    currentTab === "closed" &&
    buttonText === "Reconnect"
  ) {
    setIsProfileModal(true);
  }

  // Reconnect
  if (
    setIsProfileModal &&
    currentPage === "matches" &&
    currentTab === "closed" &&
    buttonText === "Send" &&
    chatId &&
    token
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
    }
  }

  // Send Request (Open Modal)
  if (
    setIsProfileModal &&
    currentPage === "explore" &&
    buttonText === "Send Request"
  ) {
    setIsProfileModal(true);
  }

  // Send Request
  if (
    setIsProfileModal &&
    currentPage === "explore" &&
    buttonText === "Send Request" &&
    menteeId &&
    mentorId &&
    token
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
    router.push("/chat?id=" + chatId);
  }
};

export {getButtonText, getSecondaryButtonText, performProfileAction};
