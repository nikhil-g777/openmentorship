"use client";

import {StatsData, UsersData} from "@/types/admin/dashboard";
import {
  useAdminDashboardStore,
  useCommonStore,
  useListingStore,
  useProfileStore,
} from "@/zustand/store";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

type Props = {
  statsData: StatsData;
  userRole: string | undefined | null;
  userType: string;
  data: UsersData;
};

const StoreInitializer = ({statsData, userRole, userType, data}: Props) => {
  const router = useRouter();
  const {setErrorAlert} = useCommonStore();
  const {setStatsData, setUsersData} = useAdminDashboardStore();
  const {setHeading, setListingData} = useListingStore();
  const {setCurrentPage} = useProfileStore();

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

    if (!data.success) {
      setErrorAlert("Error getting data! Redirecting you to homepage.", 6);
      router.replace("/");
      return;
    }

    // Set states
    setStatsData(statsData);
    setUsersData(data);
    setHeading(userType.split("")[0].toUpperCase() + userType.slice(1) + "s");
    setListingData(data.users);
    setCurrentPage("dashboard");
  }, [
    userRole,
    router,
    setErrorAlert,
    setStatsData,
    setUsersData,
    statsData,
    data,
    setHeading,
    setListingData,
    userType,
    setCurrentPage,
  ]);
  return null;
};

export {StoreInitializer};
