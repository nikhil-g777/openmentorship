"use client";

import {TABS} from "@/constants/common";
import Link from "next/link";
import {usePathname, useSearchParams} from "next/navigation";

const SessionsTab = () => {
  const pathname = usePathname();
  const params = useSearchParams();
  const currentTab = params.get("tab") || "";
  const searchQuery = params.get("searchQuery");
  return (
    <div className="w-full">
      <div className="w-full max-w-6xl mx-auto flex justify-center mt-4">
        <div className="tabs tabs-boxed">
          <Link
            href={
              pathname +
              "?tab=active" +
              (searchQuery ? "&searchQuery=" + searchQuery : "")
            }
            className={`tab sm:tab-md lg:tab-lg ${
              currentTab === TABS.ADMIN.SESSIONS.ACTIVE ||
              currentTab === "" ||
              !currentTab
                ? "tab-active"
                : ""
            }`}
          >
            Active
          </Link>
          <Link
            href={
              pathname +
              "?tab=closed" +
              (searchQuery ? "&searchQuery=" + searchQuery : "")
            }
            className={`tab sm:tab-md lg:tab-lg ${
              currentTab === TABS.ADMIN.SESSIONS.CLOSED ? "tab-active" : ""
            }`}
          >
            Closed
          </Link>
        </div>
      </div>
    </div>
  );
};

export {SessionsTab};
