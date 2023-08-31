"use client";

import {useSearchParams} from "next/navigation";
import {Search} from "../common/search";

const HeaderWrapper = () => {
  const params = useSearchParams();
  const tab = params.get("tab") || "";

  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Title */}
      <h3 className="font-lg sm:text-xl font-semibold">
        {tab === "closed" ? "Closed Sessions" : "Active Sessions"}
      </h3>
      {/* Search */}
      <Search />
    </div>
  );
};

export {HeaderWrapper};
