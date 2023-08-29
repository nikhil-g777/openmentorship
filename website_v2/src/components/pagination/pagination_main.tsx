"use client";
import {
  handleDashboardNext,
  handleDashboardPrev,
  handleExploreNext,
  handleExplorePrev,
} from "@/helpers/pagination";
import {UserProfile} from "@/types/profile";
import {useCommonStore, useProfileStore} from "@/zustand/store";
import {useSearchParams, usePathname, useRouter} from "next/navigation";
import {useEffect, useTransition} from "react";

type Props = {
  data: {
    success: boolean;
    mentors?: UserProfile["user"][];
    users?: UserProfile["user"][];
    totalPages: number;
    currentPage: string;
  };
};

const Pagination = ({data}: Props) => {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const limit = params.get("limit") || "10";
  const areasOfInterest = params.get("areasOfInterest") || "";
  const goals = params.get("goals") || "";
  const communicationFrequency = params.get("communicationFrequency") || "";
  const communicationPreferences = params.get("communicationPreferences") || "";
  const userType = params.get("userType") || "mentee";
  const paginationData = data.mentors || data.users;
  const totalPages = data.totalPages;
  const currentPage = Number(data.currentPage);
  const {setRouteActionLoading} = useCommonStore();
  const [isPending, startTransition] = useTransition();
  const {currentPage: routePage} = useProfileStore();

  // Handle Previous Page
  const handlePrevPage = () => {
    // Explore Page
    if (routePage === "explore") {
      handleExplorePrev({
        pathname,
        currentPage,
        limit,
        areasOfInterest,
        goals,
        communicationFrequency,
        communicationPreferences,
        router,
        startTransition,
      });
    }

    // Dashboard Page
    if (routePage === "dashboard") {
      handleDashboardPrev({
        pathname,
        currentPage,
        userType,
        router,
        startTransition,
      });
    }
  };

  // Handle Next Page
  const handleNextPage = () => {
    // Explore Page
    if (routePage === "explore") {
      handleExploreNext({
        pathname,
        currentPage,
        limit,
        areasOfInterest,
        goals,
        communicationFrequency,
        communicationPreferences,
        router,
        startTransition,
      });
    }

    // Dashboard Page
    if (routePage === "dashboard") {
      handleDashboardNext({
        pathname,
        currentPage,
        userType,
        router,
        startTransition,
      });
    }
  };

  // Update isPending state
  useEffect(() => {
    setRouteActionLoading(isPending);
  }, [isPending, setRouteActionLoading]);

  return (
    <>
      {data && paginationData && paginationData.length ? (
        <div className="w-full btn-group mb-24 flex justify-center">
          <div
            className={`btn btn-outline hover:btn-primary border-base-300 ${
              currentPage === 1 ? "btn-disabled" : ""
            }`}
            onClick={handlePrevPage}
          >
            «
          </div>
          <button className="btn btn-outline border-base-300 pointer-events-none">
            Page {currentPage}
          </button>
          <div
            className={`btn btn-outline hover:btn-primary border-base-300 ${
              currentPage === totalPages ? "btn-disabled" : ""
            }`}
            onClick={handleNextPage}
          >
            »
          </div>
        </div>
      ) : null}
    </>
  );
};

export {Pagination};
