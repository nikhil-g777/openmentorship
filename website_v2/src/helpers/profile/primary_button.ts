import {PAGES, TABS, USER_TYPE} from "@/constants/common";
import {PerformProfileAction, buttonArgs} from "@/types/profile";

// Get Button Text
const getButtonText = ({currentPage, currentTab, userType}: buttonArgs) => {
  // Mentee's
  if (currentPage === PAGES.EXPLORE && userType === USER_TYPE.MENTEE) {
    return "Send Request";
  }
  if (
    currentPage === PAGES.MATCHES &&
    userType === USER_TYPE.MENTEE &&
    (currentTab === TABS.MATCHES.ACTIVE || currentTab === "" || !currentTab)
  ) {
    return "Chat";
  }
  if (
    currentPage === PAGES.MATCHES &&
    userType === USER_TYPE.MENTEE &&
    currentTab === TABS.MATCHES.PENDING
  ) {
    return "Withdraw Request";
  }
  if (
    currentPage === PAGES.MATCHES &&
    userType === USER_TYPE.MENTEE &&
    currentTab === TABS.MATCHES.CLOSED
  ) {
    return "Reconnect";
  }

  // Mentor's
  if (
    currentPage === PAGES.MATCHES &&
    userType === USER_TYPE.MENTOR &&
    (currentTab === TABS.MATCHES.ACTIVE || currentTab === "" || !currentTab)
  ) {
    return "Chat";
  }
  if (
    currentPage === PAGES.MATCHES &&
    userType === USER_TYPE.MENTOR &&
    currentTab === TABS.MATCHES.PENDING
  ) {
    return "View Request";
  }
  if (
    currentPage === PAGES.MATCHES &&
    userType === USER_TYPE.MENTOR &&
    currentTab === TABS.MATCHES.CLOSED
  ) {
    return "Archived Chat";
  }

  // Return empty string
  return "";
};

// Get Button Color
const getButtonColor = (buttonText: string) => {
  if (
    buttonText === "Send Request" ||
    buttonText === "Chat" ||
    buttonText === "Reconnect" ||
    buttonText === "View Request"
  ) {
    return "btn-accent";
  } else if (buttonText === "Withdraw Request") {
    return "btn-outline btn-error";
  } else return "btn-outline";
};

// Perform Button Action
const performProfileAction = async ({
  currentPage,
  currentTab,
  router,
  chatId,
  buttonText,
  isProfileModal,
  setIsProfileModal,
  confirmationText,
  setConfirmationText,
  requestMessage,
}: PerformProfileAction) => {
  // Chat
  if (
    currentPage === PAGES.MATCHES &&
    (currentTab === TABS.MATCHES.ACTIVE || currentTab === "" || !currentTab) &&
    buttonText === "Chat"
  ) {
    router.push("/chat?id=" + chatId);
  }

  // Withdraw Request (Open Modal)
  if (
    currentPage === PAGES.MATCHES &&
    currentTab === TABS.MATCHES.PENDING &&
    buttonText === "Withdraw Request" &&
    !confirmationText &&
    setConfirmationText
  ) {
    setConfirmationText("Are you sure you want to withdraw your request?");
  }

  // Reconnect (Open Modal)
  if (
    !isProfileModal &&
    setIsProfileModal &&
    currentPage === PAGES.MATCHES &&
    currentTab === TABS.MATCHES.CLOSED &&
    buttonText === "Reconnect"
  ) {
    setIsProfileModal(true);
  }

  // Send Request (Open Modal)
  if (
    !isProfileModal &&
    setIsProfileModal &&
    currentPage === PAGES.EXPLORE &&
    buttonText === "Send Request"
  ) {
    setIsProfileModal(true);
  }

  // Approve Request (Open Modal)
  if (
    currentPage === PAGES.MATCHES &&
    currentTab === TABS.MATCHES.PENDING &&
    buttonText === "View Request" &&
    !confirmationText &&
    setConfirmationText &&
    requestMessage &&
    requestMessage !== ""
  ) {
    setConfirmationText(requestMessage);
  }

  // Archived Chat
  if (
    currentPage === PAGES.MATCHES &&
    currentTab === TABS.MATCHES.CLOSED &&
    buttonText === "Archived Chat"
  ) {
    router.push("/chat?id=" + chatId + "&type=archive");
  }
};

export {getButtonText, getButtonColor, performProfileAction};
