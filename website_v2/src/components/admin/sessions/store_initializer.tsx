"use client";

import {SessionData} from "@/types/admin/sessions";
import {
  useAdminSessionStore,
  useCommonStore,
  useProfileStore,
} from "@/zustand/store";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect} from "react";

type Props = {
  data: SessionData;
  searchData: SessionData;
};

const StoreInitializer = ({data, searchData}: Props) => {
  const router = useRouter();
  const params = useSearchParams();
  const tab = params.get("tab") || "";
  const {setErrorAlert} = useCommonStore();
  const {setCurrentPage, setCurrentTab} = useProfileStore();
  const {setSessionData, setSearchData} = useAdminSessionStore();

  useEffect(() => {
    // Redirect if data is not available
    if (!data.success) {
      setErrorAlert("Error getting data! Redirecting you to homepage.", 6);
      router.replace("/");
      return;
    }

    if (searchData && !searchData.success) {
      setErrorAlert("Error getting data! Redirecting you to homepage.", 6);
      router.replace("/");
      return;
    }

    // Set states
    const filteredData =
      tab === "active" || tab === ""
        ? data.sessions.filter(data => data.status === "active")
        : data.sessions.filter(data => data.status === "closed");
    setSessionData(filteredData);
    setSearchData(null);
    setCurrentPage("sessions");
    setCurrentTab(tab);

    // Set search data
    if (searchData) {
      const filteredData =
        tab === "active" || tab === ""
          ? searchData.sessions.filter(data => data.status === "active")
          : searchData.sessions.filter(data => data.status === "closed");
      setSearchData(filteredData);
      setSessionData(null);
    }
  }, [
    data,
    searchData,
    setErrorAlert,
    router,
    setCurrentPage,
    setSearchData,
    setSessionData,
    setCurrentTab,
    tab,
  ]);

  return null;
};

export {StoreInitializer};
