"use client";

import {useAdminSessionStore} from "@/zustand/store";
import {SessionCard} from "./session_card";

const SessionsListing = () => {
  const {sessionData, searchData} = useAdminSessionStore();
  return (
    <div className="w-full pt-20 max-w-6xl mx-auto">
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
