import {PAGES, TABS} from "@/constants/common";
import {PerformProfileAction, buttonArgs} from "@/types/profile";

// Get Secondary Button Text
const getSecondaryButtonText = ({
  currentPage,
  currentTab,
  userType,
}: buttonArgs) => {
  // Mentee
  if (
    currentPage === PAGES.MATCHES &&
    currentTab === TABS.MATCHES.CLOSED &&
    userType === "mentee"
  ) {
    return "Archived Chat";
  }

  if (
    currentPage === PAGES.MATCHES &&
    (currentTab === TABS.MATCHES.ACTIVE || currentTab === "" || !currentTab) &&
    userType === "mentee"
  ) {
    return "End Session";
  }

  // Mentor
  if (
    currentPage === PAGES.MATCHES &&
    (currentTab === TABS.MATCHES.ACTIVE || currentTab === "" || !currentTab) &&
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
    (currentPage === PAGES.MATCHES || currentPage === PAGES.CHAT) &&
    (currentTab === TABS.MATCHES.ACTIVE || currentTab === "" || !currentTab) &&
    secondaryButtonText === "End Session" &&
    setConfirmationText &&
    confirmationText === ""
  ) {
    setConfirmationText("Are you sure that you would like to end the session?");
  }

  // Decline Request (Modal)
  if (
    currentPage === PAGES.MATCHES &&
    currentTab === TABS.MATCHES.PENDING &&
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
    currentPage === PAGES.MATCHES &&
    currentTab === TABS.MATCHES.CLOSED &&
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
