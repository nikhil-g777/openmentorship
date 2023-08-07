import {headerProvider} from "./root";

// Get User Matches
const getUserMatches = async (token: string) => {
  try {
    const res = await fetch(`${process.env.BACKEND_BASE_URL}/users/matches`, {
      method: "GET",
      headers: headerProvider(token),
      cache: "no-store",
    });
    const userMatches = await res.json();
    return userMatches;
  } catch (error) {
    return error;
  }
};

// Update Matches
const updateMatches = async (
  matchId: string,
  status: string,
  requestMessage: string,
  token: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/matches/update`,
      {
        method: "POST",
        headers: headerProvider(token),
        body: JSON.stringify({
          matchId,
          status,
          requestMessage,
        }),
        cache: "no-store",
      }
    );
    const updatedMatches = await res.json();
    return updatedMatches;
  } catch (error) {
    return error;
  }
};

// Create Match
const createMatch = async (
  menteeId: string,
  mentorId: string,
  requestMessage: string,
  token: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/matches/create`,
      {
        method: "POST",
        headers: headerProvider(token),
        body: JSON.stringify({
          match: {
            menteeId,
            mentorId,
            requestMessage,
          },
        }),
        cache: "no-store",
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export {getUserMatches, updateMatches, createMatch};
