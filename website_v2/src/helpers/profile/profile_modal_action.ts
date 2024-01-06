import {PAGES, SUCCESS_ALERT, TABS} from "@/constants/common";
import {createMatch, updateMatches} from "@/endpoints/matches";
import {PerformProfileAction} from "@/types/profile";

// Perform Profile Modal Action
const performProfileModalAction = async ({
  isProfileModal,
  setIsProfileModal,
  currentPage,
  currentTab,
  message,
  setMessage,
  router,
  setLoading,
  buttonText,
  chatId,
  token,
  setSuccessAlert,
  setErrorAlert,
  menteeId,
  mentorId,
}: PerformProfileAction) => {
  // Send Request
  if (
    isProfileModal &&
    setIsProfileModal &&
    currentPage === PAGES.EXPLORE &&
    buttonText === "Send Request" &&
    message &&
    setMessage &&
    menteeId &&
    menteeId.length &&
    mentorId &&
    mentorId.length &&
    token &&
    token.length
  ) {
    setLoading(true);
    const res = await createMatch(menteeId, mentorId, message, token);
    setLoading(false);
    if (!res.success && setErrorAlert) {
      setIsProfileModal(false);
      setErrorAlert(res.error, 6);
    }
    if (res.success && setSuccessAlert) {
      setIsProfileModal(false);
      setMessage("");
      setSuccessAlert(SUCCESS_ALERT.REQUEST_SENT, 6);
      router.refresh();
    }
  }
  // Reconnect
  if (
    isProfileModal &&
    setIsProfileModal &&
    currentPage === PAGES.MATCHES &&
    currentTab === TABS.MATCHES.CLOSED &&
    buttonText === "Reconnect" &&
    message &&
    setMessage &&
    chatId &&
    chatId.length &&
    token &&
    token.length
  ) {
    setLoading(true);
    const res = await updateMatches(chatId, "active", message, token);
    setLoading(false);
    if (!res.success && setErrorAlert) {
      setErrorAlert(res.error, 6);
    }
    if (res.success && setSuccessAlert) {
      setIsProfileModal(false);
      setMessage("");
      setSuccessAlert(SUCCESS_ALERT.REQUEST_SENT, 6);
      router.push("/matches?tab=pending");
    }
  }
};

export {performProfileModalAction};
