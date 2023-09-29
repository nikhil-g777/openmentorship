import {PerformProfileAction, buttonArgs} from "@/types/profile";

// Get Secondary Button Text
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

  // Return null if none of the above matches
  return "";
};

// Get Secondary Button Color
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

// Perform Button Action
const performSecondaryButtonAction = async ({
  currentPage,
  currentTab,
  router,
  chatId,
  secondaryButtonText,
  confirmationText,
  setConfirmationText,
}: PerformProfileAction) => {
  // End Session (Modal)
  if (
    (currentPage === "matches" || currentPage === "chat") &&
    (currentTab === "active" || currentTab === "" || !currentTab) &&
    secondaryButtonText === "End Session" &&
    setConfirmationText &&
    confirmationText === ""
  ) {
    setConfirmationText("Are you sure that you would like to end the session?");
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

  // Archived Chat
  if (
    currentPage === "matches" &&
    currentTab === "closed" &&
    secondaryButtonText === "Archived Chat"
  ) {
    router.push("/chat?id=" + chatId + "&type=archive");
  }
};

export {
  getSecondaryButtonText,
  getSecondaryButtonColor,
  performSecondaryButtonAction,
};
