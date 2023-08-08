"use client";

import {useAdminDashboardStore} from "@/zustand/store";

const StatsContainer = () => {
  const {statsData} = useAdminDashboardStore();

  return (
    <div className="w-full flex flex-col lg:flex-row mb-16">
      <div className="w-full flex flex-col card border-base-300 border py-10 px-4 rounded-box items-center justify-center gap-2">
        <p className="text-5xl font-semibold">{statsData?.mentorCount}</p>
        <span>Total number of mentors</span>
      </div>
      <div className="divider lg:divider-horizontal"></div>
      <div className="w-full flex flex-col card border-base-300 border py-10 px-4 rounded-box items-center justify-center gap-2">
        <p className="text-5xl font-semibold">{statsData?.menteeCount}</p>
        <span>Total number of mentees</span>
      </div>
      <div className="divider lg:divider-horizontal"></div>
      <div className="w-full flex flex-col card border-base-300 border py-10 px-4 rounded-box items-center justify-center gap-2">
        <p className="text-5xl font-semibold">
          {statsData?.matchCounts?.active}
        </p>
        <span>Active sessions</span>
      </div>
    </div>
  );
};

export {StatsContainer};
