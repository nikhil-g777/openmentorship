"use client";

import {NoResult} from "@/components/noResult/no_result";
import {HeaderWrapper} from "./header_wrapper";
import {SessionsListing} from "./sessions_listing";
import {useAdminSessionStore} from "@/zustand/store";

const SessionsWrapper = () => {
  const {sessionData, searchData} = useAdminSessionStore();

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16">
      {/* Header */}
      <HeaderWrapper />
      {/* Listing */}
      <SessionsListing />
      {/* No Result */}
      {sessionData && !sessionData.length ? (
        <NoResult message="Sorry! No Result Found" />
      ) : null}
      {searchData && !searchData.length ? (
        <NoResult message="Sorry! No Result Found" />
      ) : null}
    </div>
  );
};

export {SessionsWrapper};
