"use client";

import {useCommonStore} from "@/zustand/store";
import {useEffect, useState} from "react";

const StoreInitializer = () => {
  const {setErrorAlert, routeActionLoading, setRouteActionLoading} =
    useCommonStore();
  const [counter, setCounter] = useState<number>(0);

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
