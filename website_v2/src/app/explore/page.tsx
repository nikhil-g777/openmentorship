import React from "react";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import {authOptions} from "@/helpers/auth_options";
import {FilterWrapper} from "@/components/filter/filter_wrapper";
import {CarouselWrapper} from "@/components/carousel/carousel_wrapper";
import {Listing} from "@/components/listing/listing_main";
import {Pagination} from "@/components/pagination/pagination_main";
import {NoResult} from "@/components/noResult/no_result";
import {getExploreData, getExploreDataByContent} from "@/endpoints/explore";

type Props = {
  searchParams: {
    [key: string]: string;
  };
};
const Page = async ({searchParams}: Props) => {
  // Session
  const session = await getServerSession(authOptions);

  // Params
  const page = Number(searchParams["page"]);
  const limit = Number(searchParams["limit"]);
  const areasOfInterest = searchParams["areasOfInterest"];
  const goals = searchParams["goals"];
  const communicationFrequency = searchParams["communicationFrequency"];
  const communicationPreferences = searchParams["communicationPreferences"];

  // Redirect to landing page if user not found
  if (!session?.user) {
    redirect("/");
  }

  // Get data
  const data = await getExploreData(session.user.token);
  const contentData = await getExploreDataByContent(
    session.user.token,
    page,
    limit,
    areasOfInterest,
    goals,
    communicationFrequency,
    communicationPreferences
  );

  return (
    <div className="w-full">
      <FilterWrapper title="Find your Mentor" />
      {/* Only show Carousel if no filters applied */}
      {!areasOfInterest.length &&
      !goals.length &&
      !communicationFrequency.length &&
      !communicationPreferences.length ? (
        <CarouselWrapper data={data.recommendations} />
      ) : null}

      {/* Listing and Pagination */}
      <Listing data={contentData.mentors} />
      <Pagination
        data={contentData.mentors}
        currentPage={Number(contentData.currentPage)}
        totalPages={contentData.totalPages}
      />

      {/* No Result */}
      {!contentData.mentors.length ? (
        <NoResult message="Sorry! No Result Found" />
      ) : null}
    </div>
  );
};

export default Page;
