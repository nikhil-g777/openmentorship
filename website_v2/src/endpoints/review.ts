import {headerProvider} from "./root";

// Get All Reviews
const getReviews = async (
  token: string,
  page = 1,
  limit = 10,
  mentorId: string,
  sessionId: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/reviews/getReviews?page=${page}&limit=${limit}&mentorId=${mentorId}&sessionId=${sessionId}`,
      {
        headers: headerProvider(token),
        method: "GET",
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

// Add a Review
const addReview = async (token: string, review: object, sessionId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/reviews/addReview?sessionId=${sessionId}`,
      {
        headers: headerProvider(token),
        method: "POST",
        body: JSON.stringify(review),
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export {getReviews, addReview};
