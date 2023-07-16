"use client";

import {performCardData} from "@/helpers/matches";
import {MatchesProfile, MatchesResponse} from "@/types/matches";
import {
  useCommonStore,
  useListingStore,
  useProfileStore,
} from "@/zustand/store";
import {useEffect} from "react";

type Props = {
  heading: string;
  currentTab: string;
  userType: string;
  data: MatchesResponse;
  filteredData: MatchesProfile[];
};

const StoreInitializer = ({
  heading,
  currentTab,
  userType,
  data,
  filteredData,
}: Props) => {
  const {setCollapsable, setCurrentPage, setCurrentTab, setUserType} =
    useProfileStore();
  const {setListingData, setHeading} = useListingStore();
  const {setErrorAlert} = useCommonStore();

  // Re-render on data change
  useEffect(() => {
    // Return if request is not successful
    if (!data.success) {
      setErrorAlert("Error getting data! Try refreshing the page", 6);
      return;
    }

    // Set listing data
    const cardData = performCardData(filteredData, "matches", userType);
    setListingData(cardData);
    setHeading(heading);
    // Set profile data
    setCollapsable(true);
    setCurrentPage("matches");
    setCurrentTab(currentTab);
    setUserType(userType);
  }, [
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
