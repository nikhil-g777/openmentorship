"use client";

import {
  useCommonStore,
  useProfileSettingsStore,
  useRegisterStore,
} from "@/zustand/store";
import {redirect} from "next/navigation";
import {useEffect} from "react";

const StoreInitializer = () => {
  const {setIsEditable} = useProfileSettingsStore();
  const {firstName, lastName, email, userId} = useRegisterStore();
  const {setErrorAlert} = useCommonStore();

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
