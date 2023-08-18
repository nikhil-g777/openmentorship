"use client";

import {Listing} from "@/components/listing/listing_main";
import {HeaderWrapper} from "./header_wrapper";
import {Pagination} from "@/components/pagination/pagination_main";
import {useAdminDashboardStore} from "@/zustand/store";

const Users = () => {
  const {usersData} = useAdminDashboardStore();

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16">
      <HeaderWrapper />
      {usersData ? <Listing /> : null}
      {usersData ? <Pagination data={usersData} /> : null}
    </div>
  );
};

export {Users};
