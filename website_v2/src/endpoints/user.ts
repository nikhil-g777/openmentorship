import {RegisterBody} from "@/types/regsiter";
import {headerProvider} from "./root";

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

// next-auth Authorization
const nextAuthLogin = async (
  credentials: Record<"authCode", string> | undefined
) => {
  try {
    const res = await fetch(`${process.env.BACKEND_BASE_URL}/users/login`, {
      method: "POST",
      headers: headerProvider(),
      body: JSON.stringify({
        authCode: credentials?.authCode,
        isLocal: Boolean(process.env.NEXT_APP_IS_LOCAL),
      }),
    });
    return res;
  } catch (error) {
    return error;
  }
};

// Register User
const registerUser = async (data: {
  authCode: string;
  type: string;
  isLocal?: boolean;
}) => {
  // Check if app is local
  if (
    process.env.NEXT_PUBLIC_APP_IS_LOCAL &&
    process.env.NEXT_PUBLIC_APP_IS_LOCAL === "true"
  ) {
    data.isLocal = true;
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users/register`,
      {
        method: "POST",
        headers: headerProvider(),
        body: JSON.stringify({
          ...data,
        }),
      }
    );
    return res.json();
  } catch (error) {
    return error;
  }
};

// Update User
const updateUser = async (token: string, data: RegisterBody) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users/update`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...data,
        }),
      }
    );
    return res.json();
  } catch (error) {
    return error;
  }
};

export {getUserInfo, nextAuthLogin, registerUser, updateUser};