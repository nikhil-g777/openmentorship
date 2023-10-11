"use client";

import {USER_TYPE} from "@/constants/common";
import {useCommonStore, useRegisterStore} from "@/zustand/store";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

const StoreInitializer = () => {
  const router = useRouter();
  const userType = useSession().data?.user?.user?.userType;
  const {resetState} = useRegisterStore();
  const {successAlert, setSuccessAlert} = useCommonStore();

  // Reset state
  useEffect(() => {
    resetState();
  }, [resetState]);

  // Redirect on successful sign in
  useEffect(() => {
    let timer: null | NodeJS.Timeout = null;
    if (userType && successAlert === "Successfully signed in!") {
      // Fire after 3 seconds
      timer = setTimeout(() => {
        if (userType === USER_TYPE.MENTEE) {
          setSuccessAlert("Redirecting you to dashboard...", 3);
          router.push(
            "/explore?page=1&limit=10&areasOfInterest=&goals=&communicationFrequency=&communicationPreferences="
          );
          router.refresh();
        } else {
          setSuccessAlert("Redirecting you to matches...", 3);
          router.push("/matches");
          router.refresh();
        }
      }, 2000);
    }

    // Clear timer on unmount
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [userType, successAlert, setSuccessAlert, router]);

  return null;
};

export {StoreInitializer};
