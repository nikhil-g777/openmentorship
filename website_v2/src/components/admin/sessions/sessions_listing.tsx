"use client";

import {useAdminSessionStore} from "@/zustand/store";
import {SessionCard} from "./session_card";
import {useSearchParams} from "next/navigation";

const SessionsListing = () => {
  const params = useSearchParams();
  const tab = params.get("tab") || "";
  const searchQuery = params.get("searchQuery") || "";
  const {sessionData, searchData} = useAdminSessionStore();

  return (
    <div className="w-full pt-20 max-w-6xl mx-auto">
      {/* Title */}
      <h3 className="font-lg sm:text-xl font-semibold mb-4 md:mb-8">
        {sessionData && sessionData.length
          ? tab === "closed"
            ? "Closed Sessions"
            : "Active Sessions"
          : null}
        {searchData && searchData.length
          ? `Search Results: ${searchQuery}`
          : null}
      </h3>

      {/* Session Data */}
      {sessionData && sessionData.length
        ? sessionData.map(session => (
            <SessionCard key={session._id} data={session} />
          ))
        : null}

      {/* Search Data */}
      {searchData && searchData.length
        ? searchData.map(session => (
            <SessionCard key={session._id} data={session} />
          ))
        : null}
    </div>
  );
};

export {SessionsListing};
