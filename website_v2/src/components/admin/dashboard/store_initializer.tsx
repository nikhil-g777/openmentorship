"use client";

import {StatsData} from "@/types/admin/dashboard";
import {useAdminDashboardStore, useCommonStore} from "@/zustand/store";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

type Props = {
  statsData: StatsData;
  userRole: string | undefined | null;
};

const StoreInitializer = ({statsData, userRole}: Props) => {
  const router = useRouter();
  const {setErrorAlert} = useCommonStore();
  const {setStatsData} = useAdminDashboardStore();

  useEffect(() => {
    // Redirect if user is not admin
    if (userRole !== "admin") {
      setErrorAlert(
        "You are not authorized to access this page! Redirecting you to homepage.",
        6
      );
      router.replace("/");
      return;
    }
    // Redirect if data is not available
    if (!statsData.success) {
      setErrorAlert("Error getting data! Redirecting you to homepage.", 6);
      router.replace("/");
      return;
    }

    // Set states
    setStatsData(statsData);
  }, [userRole, router, setErrorAlert, setStatsData, statsData]);
  return null;
};

export {StoreInitializer};
