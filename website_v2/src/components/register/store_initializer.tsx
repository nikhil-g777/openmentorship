"use client";

import {headerProvider} from "@/endpoints/root";
import {tempAuth} from "@/endpoints/user";
import {
  useCommonStore,
  useProfileSettingsStore,
  useRegisterStore,
} from "@/zustand/store";
import {redirect} from "next/navigation";
import {useEffect} from "react";

const StoreInitializer = () => {
  const {setIsEditable} = useProfileSettingsStore();
  const {
    firstName,
    lastName,
    email,
    userId,
    setFirstName,
    setLastName,
    setEmail,
    setUserId,
    setToken,
  } = useRegisterStore();
  const {setErrorAlert} = useCommonStore();

  // Set pre-fill states on cypress
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_CYPRESS_TEST === "true") {
      const fetchCypressStates = async () => {
        const res = (await tempAuth(
          process.env.NEXT_PUBLIC_CYPRESS_ACCOUNT_TYPE === "mentee"
            ? process.env.NEXT_PUBLIC_CYPRESS_MENTEE_ID!
            : process.env.NEXT_PUBLIC_CYPRESS_MENTEE_ID!
        )) as Response;
        const tempAuthRes = await res.json();
        // Set token
        setToken(tempAuthRes.token);

        const userRes = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users/info`,
          {
            method: "GET",
            headers: headerProvider(tempAuthRes.token),
          }
        );
        const user = await userRes.json();
        setFirstName(user.user.firstName);
        setLastName(user.user.lastName);
        setEmail(user.user.email);
        setUserId(user.user.id);
      };
      fetchCypressStates();
    }
  }, [setEmail, setFirstName, setLastName, setUserId, setToken]);

  // Set isEditable to true on mount
  useEffect(() => {
    setIsEditable(true);

    // Redirect to landing page if states are empty
    if (
      (process.env.NEXT_PUBLIC_CYPRESS_TEST === "false" ||
        !process.env.NEXT_PUBLIC_CYPRESS_TEST) &&
      (!firstName || !lastName || !email || !userId)
    ) {
      setErrorAlert("Unable to get details. Try signing in again.", 6);
      redirect("/");
    }
  }, [setIsEditable, setErrorAlert, firstName, lastName, email, userId]);
  return null;
};

export {StoreInitializer};
