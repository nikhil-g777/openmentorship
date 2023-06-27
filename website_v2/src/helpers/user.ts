// Get User Details
const getUserInfo = async (authCode: string) => {
  try {
    const userRes = await fetch(`${process.env.BACKEND_BASE_URL}/users/info`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        accept: "application/json",
        authorization: `Bearer ${authCode}`,
      },
    });
    const userInfo = await userRes.json();
    return userInfo;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export {getUserInfo};
