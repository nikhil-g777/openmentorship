"use client";

import {PAGES} from "@/constants/common";
import {SearchData, StatsData, UsersData} from "@/types/admin/dashboard";
import {
  useAdminDashboardStore,
  useCommonStore,
  useListingStore,
  useProfileStore,
} from "@/zustand/store";
import {notFound, useRouter} from "next/navigation";
import {useEffect} from "react";

type Props = {
  token: string | null | undefined;
  statsData: StatsData;
  userRole: string | undefined | null;
  userType: string;
  data: UsersData;
  searchData: SearchData | null;
  searchQuery: string | undefined | null;
};

const StoreInitializer = ({
  token,
  statsData,
  userRole,
  userType,
  data,
  searchData,
  searchQuery,
}: Props) => {
  const router = useRouter();
  const {setErrorAlert} = useCommonStore();
  const {setStatsData, setUsersData} = useAdminDashboardStore();
  const {setHeading, setListingData} = useListingStore();
  const {setCurrentPage} = useProfileStore();

  useEffect(() => {
    // Redirect if token is not available
    if (!token) {
      setErrorAlert("Error getting data! Redirecting you to homepage.", 6);
      router.replace("/");
      return;
    }

    // Redirect if user is not admin
    if (userRole !== "admin") {
      setErrorAlert(
        "You are not authorized to access this page! Redirecting you to homepage.",
        6
      );
      router.replace("/");
      return;
    }

    // Not found is request failed
    if (!statsData.success || !data.success) {
      notFound();
    }

    // Not found if search request failed
    if (searchData && !searchData.success) {
      notFound();
    }

    // Set states
    setStatsData(statsData);
    setUsersData(data);
    setHeading(userType.split("")[0].toUpperCase() + userType.slice(1) + "s");
    setListingData(data.users);
    setCurrentPage(PAGES.ADMIN.DASHBOARD);

    // Set search data
    if (searchData) {
      setListingData(searchData.users);
      setUsersData(null);
      if (searchData.users.length === 0) {
        setHeading("");
      } else {
        setHeading("Search Results: " + searchQuery);
      }
    }
  }, [
    token,
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
    searchData,
    searchQuery,
  ]);
  return null;
};

export {StoreInitializer};
