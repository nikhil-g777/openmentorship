"use client";

import {PAGES, USER_TYPE} from "@/constants/common";
import {UserProfile} from "@/types/profile";
import {
  useCarouselStore,
  useCommonStore,
  useListingStore,
  useProfileStore,
} from "@/zustand/store";
import {notFound, useRouter} from "next/navigation";
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
  token: string | undefined | null;
};

const StoreInitializer = ({data, content, token}: Props) => {
  const router = useRouter();
  const {setCarouselData} = useCarouselStore();
  const {setCollapsable, setCurrentPage, setCurrentTab, setUserType} =
    useProfileStore();
  const {setListingData, setHeading} = useListingStore();
  const {setErrorAlert} = useCommonStore();

  // Re-render on data change
  useEffect(() => {
    // 404 page if request failed
    if (!data.success || !content.success) {
      notFound();
    }

    // Set carousel data
    setCarouselData(data.recommendations);
    // Set listing data
    setListingData(content.mentors);
    setHeading("All Results");
    // Set profile data
    setCollapsable(true);
    setCurrentPage(PAGES.EXPLORE);
    setCurrentTab("");
    setUserType(USER_TYPE.MENTEE);
  }, [
    router,
    token,
    data,
    content,
    setErrorAlert,
    setCarouselData,
    setListingData,
    setHeading,
    setCollapsable,
    setCurrentPage,
    setCurrentTab,
    setUserType,
  ]);
  return null;
};

export {StoreInitializer};
