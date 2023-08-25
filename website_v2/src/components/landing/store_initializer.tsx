"use client";

import {useCommonStore} from "@/zustand/store";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

const StoreInitializer = () => {
  const router = useRouter();
  const userType = useSession().data?.user.user.userType;
  const {successAlert, setSuccessAlert} = useCommonStore();

  // Redirect on successful login
  useEffect(() => {
    let timer: null | NodeJS.Timeout = null;
    if (userType && successAlert === "Successfully logged in!") {
      // Fire after 3 seconds
      timer = setTimeout(() => {
        if (userType === "mentee") {
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
