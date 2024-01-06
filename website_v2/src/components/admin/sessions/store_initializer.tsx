"use client";

import {PAGES} from "@/constants/common";
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
    // Not found if request failed
    if (!data.success) {
      notFound();
    }

    // Not found if search request failed
    if (searchData && !searchData.success) {
      notFound();
    }

    // Set states
    setSessionData(data.sessions);
    setSearchData(null);
    setCurrentPage(PAGES.ADMIN.SESSIONS);
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
