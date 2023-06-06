import {headerProvider} from "./root";

// Get User Details
const getUserInfo = async (authCode: string) => {
  const userRes = await fetch(`${process.env.BACKEND_BASE_URL}/users/info`, {
    method: "GET",
    headers: headerProvider(authCode),
  });
  const userInfo = await userRes.json();
  return userInfo;
};

// next-auth Authorization
const nextAuthLogin = async (
  credentials: Record<"authCode", string> | undefined
) => {
  return await fetch(`${process.env.BACKEND_BASE_URL}/users/login`, {
    method: "POST",
    headers: headerProvider(),
    body: JSON.stringify({
      authCode: credentials?.authCode,
      isLocal: Boolean(process.env.NEXT_APP_IS_LOCAL),
    }),
  });
};

export {getUserInfo, nextAuthLogin};
