"use client";

import {UserProfile} from "@/types/profile";
import {
  useCarouselStore,
  useCommonStore,
  useListingStore,
  useProfileStore,
} from "@/zustand/store";
import {useEffect} from "react";

type Props = {
  data: {
    success: boolean;
    recommendations: UserProfile["user"][];
  };
  content: {
    success: boolean;
    mentors: UserProfile["user"][];
    totalPages: number;
    currentPage: string;
  };
};

const StoreInitializer = ({data, content}: Props) => {
  const {setCarouselData} = useCarouselStore();
  const {setCollapsable, setCurrentPage, setCurrentTab, setUserType} =
    useProfileStore();
  const {setListingData} = useListingStore();
  const {setErrorAlert} = useCommonStore();

  // Re-render on data change
  useEffect(() => {
    // Return if request is not successful
    if (!data.success) {
      setErrorAlert("Error getting data! Try refreshing the page", 6);
      return;
    }

    // Return if content is not successful
    if (!content.success) {
      setErrorAlert("Error getting data! Try refreshing the page", 6);
      return;
    }

    // Set carousel data
    setCarouselData(data.recommendations);
    // Set listing data
    setListingData(content.mentors);
    // Set profile data
    setCollapsable(true);
    setCurrentPage("explore");
    setCurrentTab("");
    setUserType("mentee");
  }, [
    data,
    content,
    setErrorAlert,
    setCarouselData,
    setListingData,
    setCollapsable,
    setCurrentPage,
    setCurrentTab,
    setUserType,
  ]);
  return null;
};

export {StoreInitializer};
