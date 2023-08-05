import {PerformProfileAction, buttonArgs} from "@/types/profile";

// Get Button Text
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

// Get Button Color
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

  // Send Request (Open Modal)
  if (
    !isProfileModal &&
    setIsProfileModal &&
    currentPage === "explore" &&
    buttonText === "Send Request"
  ) {
    setIsProfileModal(true);
  }

  // Approve Request (Open Modal)
  if (
    currentPage === "matches" &&
    currentTab === "pending" &&
    buttonText === "Approve Request" &&
    !confirmationText &&
    setConfirmationText
  ) {
    setConfirmationText("Are you sure you want to approve this request?");
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

export {getButtonText, getButtonColor, performProfileAction};
