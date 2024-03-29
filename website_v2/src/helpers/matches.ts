import {PAGES, USER_TYPE} from "@/constants/common";
import {MatchesProfile} from "@/types/matches";
import {UserProfile} from "@/types/profile";

// Check if there is no result
const checkNoResult = (
  userType: string,
  filteredData: MatchesProfile[]
): boolean => {
  if (
    userType === USER_TYPE.MENTEE &&
    !filteredData.map((list: MatchesProfile) => list.mentor).length
  ) {
    return true;
  } else if (
    userType === USER_TYPE.MENTOR &&
    !filteredData.map((list: MatchesProfile) => list.mentee).length
  ) {
    return true;
  } else {
    return false;
  }
};

//   Perform card data
const performCardData = (
  data: MatchesProfile[],
  currentPage: string,
  userType: string
) => {
  const CardData: UserProfile["user"][] = [];
  // Mentee
  if (currentPage === PAGES.MATCHES && userType === USER_TYPE.MENTEE && data) {
    data.map((single: MatchesProfile) => {
      const mentor = single.mentor;
      const obj = {
        ...mentor,
        matches: {
          _id: single._id,
          initialMessage: single.initialMessage,
          status: single.status,
          latestSession: single.latestSession,
        },
      };
      CardData.push(obj);
    });
  } else if (
    // Mentor
    currentPage === PAGES.MATCHES &&
    userType === USER_TYPE.MENTOR &&
    data
  ) {
    data.map((single: MatchesProfile) => {
      const mentee = single.mentee;
      const obj = {
        ...mentee,
        matches: {
          _id: single._id,
          initialMessage: single.initialMessage,
          requestMessage: single.requestMessage,
          status: single.status,
          latestSession: single.latestSession,
        },
      };
      CardData.push(obj);
    });
  }

  return CardData;
};

export {checkNoResult, performCardData};
