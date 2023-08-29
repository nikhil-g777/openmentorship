"use client";

import {Search} from "./search";
import {Status} from "./status";
import {UserType} from "./user_type";

const HeaderWrapper = () => {
  return (
    <div className="w-full p-4 rounded-box border border-base-300 flex flex-col sm:flex-row items-center justify-between gap-5">
      {/* Filters */}
      <div className="w-full sm:w-fit flex items-center gap-4">
        <UserType />
        <Status />
      </div>
      {/* Search */}
      <Search />
    </div>
  );
};

export {HeaderWrapper};
