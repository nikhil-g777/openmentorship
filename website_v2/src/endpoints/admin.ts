import {headerProvider} from "./root";

// Get stats
const getStats = async (token: string) => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_BASE_URL}/admin/statistics`,
      {
        headers: headerProvider(token),
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export {getStats};
