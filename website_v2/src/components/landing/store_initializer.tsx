"use client";

import {USER_TYPE} from "@/constants/common";
import {useCommonStore, useRegisterStore} from "@/zustand/store";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

const StoreInitializer = () => {
  const router = useRouter();
  const userType = useSession().data?.user?.user?.userType;
  const {
    successAlert,
    setSuccessAlert,
    setErrorAlert,
    routeActionLoading,
    setRouteActionLoading,
  } = useCommonStore();
  const {resetState} = useRegisterStore();
  const [counter, setCounter] = useState<number>(0);

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

  // Start timeout counter for 90 seconds on routeActionLoading
  useEffect(() => {
    let timer: null | NodeJS.Timeout = null;
    if (routeActionLoading && counter < 90) {
      timer = setTimeout(() => {
        setCounter(counter + 1);
      }, 1000);
    }

    // Error if counter reaches 90 seconds
    if (counter === 90) {
      setErrorAlert(
        "Your sign-in session has timed out. Please refresh the page and try again.",
        6
      );
      setRouteActionLoading(false);
      setCounter(0);
    }

    // Clear timer on unmount
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [
    routeActionLoading,
    setRouteActionLoading,
    setErrorAlert,
    counter,
    setCounter,
  ]);

  return null;
};

export {StoreInitializer};
