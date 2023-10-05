"use client";

import {PAGES} from "@/constants/common";
import {performCardData} from "@/helpers/matches";
import {MatchesProfile, MatchesResponse} from "@/types/matches";
import {
  useCommonStore,
  useListingStore,
  useProfileStore,
} from "@/zustand/store";
import {notFound, useRouter} from "next/navigation";
import {useEffect} from "react";

type Props = {
  token: string | undefined | null;
  heading: string;
  currentTab: string;
  userType: string;
  data: MatchesResponse;
  filteredData: MatchesProfile[];
};

const StoreInitializer = ({
  token,
  heading,
  currentTab,
  userType,
  data,
  filteredData,
}: Props) => {
  const router = useRouter();
  const {setCollapsable, setCurrentPage, setCurrentTab, setUserType} =
    useProfileStore();
  const {setListingData, setHeading} = useListingStore();
  const {setErrorAlert} = useCommonStore();

  // Re-render on data change
  useEffect(() => {
    // 404 page if request failed
    if (!data.success) {
      notFound();
    }

    // Set listing data
    const cardData = performCardData(filteredData, PAGES.MATCHES, userType);
    setListingData(cardData);
    setHeading(heading);
    // Set profile data
    setCollapsable(true);
    setCurrentPage(PAGES.MATCHES);
    setCurrentTab(currentTab);
    setUserType(userType);
  }, [
    token,
    router,
    data,
    filteredData,
    heading,
    setErrorAlert,
    setListingData,
    setHeading,
    setCollapsable,
    setCurrentPage,
    currentTab,
    setCurrentTab,
    userType,
    setUserType,
  ]);
  return null;
};

export {StoreInitializer};
