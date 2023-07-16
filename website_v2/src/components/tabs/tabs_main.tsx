"use client";

import Link from "next/link";
import {usePathname, useSearchParams} from "next/navigation";
import React from "react";

const Tabs = () => {
  const pathname = usePathname();
  const params = useSearchParams();
  const currentTab = params.get("tab");

  return (
    <div className="w-full">
      <div className="w-full max-w-6xl mx-auto flex justify-center mt-4">
        <div className="tabs tabs-boxed">
          <Link
            href={pathname + "?tab=active"}
            className={`tab sm:tab-md lg:tab-lg ${
              currentTab === "active" || currentTab === "" || !currentTab
                ? "tab-active"
                : ""
            }`}
          >
            Active
          </Link>
          <Link
            href={pathname + "?tab=pending"}
            className={`tab sm:tab-md lg:tab-lg ${
              currentTab === "pending" ? "tab-active" : ""
            }`}
          >
            Pending
          </Link>
          <Link
            href={pathname + "?tab=closed"}
            className={`tab sm:tab-md lg:tab-lg ${
              currentTab === "closed" ? "tab-active" : ""
            }`}
          >
            Closed
          </Link>
        </div>
      </div>
    </div>
  );
};

export {Tabs};
