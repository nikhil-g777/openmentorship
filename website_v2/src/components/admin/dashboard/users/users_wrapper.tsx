"use client";

import {Listing} from "@/components/listing/listing_main";
import {HeaderWrapper} from "./header_wrapper";
import {Pagination} from "@/components/pagination/pagination_main";
import {useAdminDashboardStore, useListingStore} from "@/zustand/store";
import {NoResult} from "@/components/noResult/no_result";

const Users = () => {
  const {usersData} = useAdminDashboardStore();
  const {listingData} = useListingStore();

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16">
      <HeaderWrapper />
      {listingData.length ? <Listing /> : null}
      {listingData.length ? null : (
        <NoResult message="Sorry! No Result Found" />
      )}
      {usersData ? <Pagination data={usersData} /> : null}
    </div>
  );
};

export {Users};
