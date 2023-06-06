import {headerProvider} from "./root";

// Get Explore Data (User Recommendations)
const getExploreData = async (token: string) => {
  const res = await fetch(
    `${process.env.BACKEND_BASE_URL}/matches/userRecommendations`,
    {
      headers: headerProvider(token),
    }
  );
  const data = await res.json();
  return data;
};

// Get Explore Content (Mentors list)
const getExploreDataByContent = async (
  token: string,
  page = 1,
  limit = 10,
  areasOfInterest: string,
  goals: string,
  communicationFrequency: string,
  communicationPreferences: string
) => {
  const res = await fetch(
    `${process.env.BACKEND_BASE_URL}/matches/searchMentors?page=${page}&limit=${limit}&areasOfInterest=${areasOfInterest}&goals=${goals}&communicationFrequency=${communicationFrequency}&communicationPreferences=${communicationPreferences}`,
    {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        accept: "application/json",
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data;
};

export {getExploreData, getExploreDataByContent};
