"use client";

import {SessionData} from "@/types/admin/sessions";
import {
  useAdminSessionStore,
  useCommonStore,
  useProfileStore,
} from "@/zustand/store";
import {notFound, useRouter, useSearchParams} from "next/navigation";
import {useEffect} from "react";

type Props = {
  token: string;
  data: SessionData;
  searchData: SessionData;
};

const StoreInitializer = ({token, data, searchData}: Props) => {
  const router = useRouter();
  const params = useSearchParams();
  const tab = params.get("tab") || "";
  const {setErrorAlert} = useCommonStore();
  const {setCurrentPage, setCurrentTab} = useProfileStore();
  const {setSessionData, setSearchData} = useAdminSessionStore();

  useEffect(() => {
    // Redirect if token is not available
    if (token === "") {
      setErrorAlert("Error getting data! Redirecting you to homepage.", 6);
      router.replace("/");
      return;
    }

    // Not found if request failed
    if (!data.success) {
      notFound();
    }

    // Not found if search request failed
    if (searchData && !searchData.success) {
      notFound();
    }

    // Set states
    const filteredData =
      tab === "active" || tab === ""
        ? data.sessions.filter(data => data.status === "active" && data.match)
        : data.sessions.filter(data => data.status === "closed" && data.match);
    setSessionData(filteredData);
    setSearchData(null);
    setCurrentPage("sessions");
    setCurrentTab(tab);

    // Set search data
    if (searchData) {
      const filteredData =
        tab === "active" || tab === ""
          ? searchData.sessions.filter(
              data => data.status === "active" && data.match
            )
          : searchData.sessions.filter(
              data => data.status === "closed" && data.match
            );
      setSearchData(filteredData);
      setSessionData(null);
    }
  }, [
    token,
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
