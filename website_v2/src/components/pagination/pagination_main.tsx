"use client";
import {UserProfile} from "@/types/profile";
import Link from "next/link";
import {useSearchParams, usePathname} from "next/navigation";

type Props = {
  data: {
    success: boolean;
    mentors: UserProfile["user"][];
    totalPages: number;
    currentPage: string;
  };
};

const Pagination = ({data}: Props) => {
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

  return (
    <>
      {data && paginationData && paginationData.length ? (
        <div className="w-full btn-group mb-24 flex justify-center">
          <Link
            href={`${pathname}?page=${
              currentPage - 1
            }&limit=${limit}&areasOfInterest=${areasOfInterest}&goals=${goals}&communicationFrequency=${communicationFrequency}&communicationPreferences=${communicationPreferences}`}
            className={`btn btn-outline border-base-300 ${
              currentPage === 1 ? "btn-disabled" : ""
            }`}
          >
            «
          </Link>
          <button className="btn btn-outline border-base-300 pointer-events-none">
            Page {currentPage}
          </button>
          <Link
            href={`${pathname}?page=${
              currentPage + 1
            }&limit=${limit}&areasOfInterest=${areasOfInterest}&goals=${goals}&communicationFrequency=${communicationFrequency}&communicationPreferences=${communicationPreferences}`}
            className={`btn btn-outline border-base-300 ${
              currentPage === totalPages ? "btn-disabled" : ""
            }`}
          >
            »
          </Link>
        </div>
      ) : null}
    </>
  );
};

export {Pagination};
