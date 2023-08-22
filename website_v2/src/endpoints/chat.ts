import {headerProvider} from "./root";

// Get Chat Token
const getChatToken = async (token: string) => {
  try {
    const res = await fetch(`${process.env.BACKEND_BASE_URL}/users/chatToken`, {
      headers: headerProvider(token),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export {getChatToken};
