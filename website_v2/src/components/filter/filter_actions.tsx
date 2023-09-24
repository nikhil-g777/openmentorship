"use client";

import {performUrlFormat} from "@/helpers/filter";
import {useCommonStore, useFilterStore} from "@/zustand/store";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useEffect, useTransition} from "react";

const FilterActions = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const limit = params.get("limit") || 10;
  const [isPending, startTransition] = useTransition();
  const {setRouteActionLoading} = useCommonStore();
  const {
    staticFilters,
    isFiltered,
    areasOfInterest,
    goals,
    communicationFrequency,
    communicationPreferences,
  } = useFilterStore();

  // Handle Reset
  const handleReset = () => {
    const uri = `${pathname}?page=${1}&limit=${10}&areasOfInterest=&goals=&communicationFrequency=&communicationPreferences=`;
    startTransition(() => {
      router.push(uri);
      router.refresh();
    });
  };

  // Handle Filter
  const handleFilter = () => {
    // Format arrays to string
    const {aoiUrl, goalsUrl, cfUrl, cpUrl} = performUrlFormat(
      areasOfInterest,
      goals,
      communicationFrequency,
      communicationPreferences
    );
    // Push to the new URL
    const uri = `${pathname}?page=${1}&limit=${limit}&areasOfInterest=${aoiUrl}&goals=${goalsUrl}&communicationFrequency=${cfUrl}&communicationPreferences=${cpUrl}`;
    startTransition(() => {
      router.push(uri);
      router.refresh();
    });
  };

  // Update isPending state
  useEffect(() => {
    setRouteActionLoading(isPending);
  }, [isPending, setRouteActionLoading]);

  return (
    <div className="w-full flex items-center justify-end gap-4 mt-4">
      <button
        className="btn btn-outline btn-error"
        onClick={handleReset}
        disabled={isPending || staticFilters.length === 0}
      >
        Reset
      </button>
      <button
        className="btn btn-primary"
        disabled={isPending || isFiltered}
        onClick={handleFilter}
      >
        Apply Filters
      </button>
    </div>
  );
};

export {FilterActions};
