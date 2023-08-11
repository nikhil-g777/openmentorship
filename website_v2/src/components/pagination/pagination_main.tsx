"use client";
import {UserProfile} from "@/types/profile";
import {useCommonStore} from "@/zustand/store";
import {useSearchParams, usePathname, useRouter} from "next/navigation";
import {useEffect, useTransition} from "react";

type Props = {
  data: {
    success: boolean;
    mentors: UserProfile["user"][];
    totalPages: number;
    currentPage: string;
  };
};

const Pagination = ({data}: Props) => {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const limit = params.get("limit");
  const areasOfInterest = params.get("areasOfInterest");
  const goals = params.get("goals");
  const communicationFrequency = params.get("communicationFrequency");
  const communicationPreferences = params.get("communicationPreferences");
  const paginationData = data.mentors;
  const totalPages = data.totalPages;
  const currentPage = Number(data.currentPage);
  const {setRouteActionLoading} = useCommonStore();
  const [isPending, startTransition] = useTransition();

  // Handle Previous Page
  const handlePrevPage = () => {
    const url = `${pathname}?page=${
      currentPage - 1
    }&limit=${limit}&areasOfInterest=${areasOfInterest}&goals=${goals}&communicationFrequency=${communicationFrequency}&communicationPreferences=${communicationPreferences}`;
    startTransition(() => {
      router.push(url);
      router.refresh();
    });
  };

  // Handle Next Page
  const handleNextPage = () => {
    const url = `${pathname}?page=${
      currentPage + 1
    }&limit=${limit}&areasOfInterest=${areasOfInterest}&goals=${goals}&communicationFrequency=${communicationFrequency}&communicationPreferences=${communicationPreferences}`;
    startTransition(() => {
      router.push(url);
      router.refresh();
    });
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
