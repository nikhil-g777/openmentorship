import React from "react";
import {getServerSession} from "next-auth";
import {authOptions} from "@/helpers/auth_options";
import {FilterWrapper} from "@/components/filter/filter_wrapper";
import {CarouselWrapper} from "@/components/carousel/carousel_wrapper";
import {Listing} from "@/components/listing/listing_main";
import {Pagination} from "@/components/pagination/pagination_main";
import {NoResult} from "@/components/noResult/no_result";
import {getExploreData, getExploreDataByContent} from "@/endpoints/explore";
import {StoreInitializer} from "@/components/explore/store_initializer";
import {ProfileCardModal} from "@/components/modals/profile_card_modal";
import {redirect} from "next/navigation";

type Props = {
  searchParams: {
    [key: string]: string;
  };
};
const Page = async ({searchParams}: Props) => {
  // Session
  const session = await getServerSession(authOptions);
  const token = session?.user?.token;

  // Check Authorization
  if (!token) redirect("/");

  // Params
  const page = Number(searchParams["page"]) || 1;
  const limit = Number(searchParams["limit"]) || 10;
  const areasOfInterest = searchParams["areasOfInterest"] || "";
  const goals = searchParams["goals"] || "";
  const communicationFrequency = searchParams["communicationFrequency"] || "";
  const communicationPreferences =
    searchParams["communicationPreferences"] || "";

  // Get data
  const data = await getExploreData(token || "");
  const contentData = await getExploreDataByContent(
    token || "",
    page,
    limit,
    areasOfInterest,
    goals,
    communicationFrequency,
    communicationPreferences
  );

  return (
    <div className="w-full">
      {/* Store initializer */}
      <StoreInitializer data={data} content={contentData} token={token} />
      <FilterWrapper title="Find your Mentor" />
      {/* Only show Carousel if no filters applied */}
      {!areasOfInterest.length &&
      !goals.length &&
      !communicationFrequency.length &&
      !communicationPreferences.length ? (
        <CarouselWrapper />
      ) : null}

      {/* Listing and Pagination */}
      <Listing />
      <Pagination data={contentData} />

      {/* No Result */}
      {contentData.success &&
      contentData.mentors &&
      !contentData.mentors.length ? (
        <NoResult message="Sorry! No Result Found" />
      ) : null}

      {/* Profile Card Modal */}
      <ProfileCardModal />
    </div>
  );
};

export default Page;
