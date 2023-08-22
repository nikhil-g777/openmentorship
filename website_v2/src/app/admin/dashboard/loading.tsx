"use client";

import {StatsLoader} from "@/loaders/admin/dashboard/stats_loader";
import {UsersLoader} from "@/loaders/admin/dashboard/users_loader";
import {useSearchParams} from "next/navigation";

const Loading = () => {
  const params = useSearchParams();
  const currentTab = params.get("tab") || "";

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Tabs */}
      <div className="w-full max-w-[170px] h-10 lg:max-w-[214px] lg:h-14 mt-4 mx-auto animate-pulse">
        <div className="tabs tabs-boxed">
          <div className="tab sm:tab-md lg:tab-lg"></div>
          <div className="tab sm:tab-md lg:tab-lg"></div>
        </div>
      </div>
      {/* Container */}
      <div className="py-16">
        {currentTab === "analytics" || currentTab === "" ? (
          <StatsLoader />
        ) : (
          <UsersLoader />
        )}
      </div>
    </div>
  );
};

export default Loading;
