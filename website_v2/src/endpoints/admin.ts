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

// Get Users List
const getUsersList = async (
  token: string,
  userType: string,
  pageNumber: number,
  registrationStatus: string
) => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_BASE_URL}/admin/userList?page=${pageNumber}&limit=10&userType=${userType}&registrationStatus=${registrationStatus}`,
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

// Search Users List
const searchUsers = async (token: string, searchString: string) => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_BASE_URL}/admin/userSearch?searchString=${searchString}`,
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

// Update Mentor Registration
const updateMentorRegistration = async (
  token: string,
  userId: string,
  registrationStatus: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/updateMentorRegistration`,
      {
        headers: headerProvider(token),
        method: "POST",
        body: JSON.stringify({
          mentorId: userId,
          registrationStatus: registrationStatus,
        }),
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export {getStats, getUsersList, searchUsers, updateMentorRegistration};
