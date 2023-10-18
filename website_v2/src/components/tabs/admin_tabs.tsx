"use client";

import {TABS} from "@/constants/common";
import Link from "next/link";
import {usePathname, useSearchParams} from "next/navigation";

const AdminTabs = () => {
  const pathname = usePathname();
  const params = useSearchParams();
  const currentTab = params.get("tab");
  return (
    <div className="w-full">
      <div className="w-full max-w-6xl mx-auto flex justify-center mt-4">
        <div className="tabs tabs-boxed">
          <Link
            href={pathname + "?tab=analytics"}
            className={`tab sm:tab-md lg:tab-lg ${
              currentTab === TABS.ADMIN.DASHBOARD.ANALYTICS ||
              currentTab === "" ||
              !currentTab
                ? "tab-active"
                : ""
            }`}
          >
            Analytics
          </Link>
          <Link
            href={pathname + "?tab=users&userType=mentee&page=1"}
            className={`tab sm:tab-md lg:tab-lg ${
              currentTab === TABS.ADMIN.DASHBOARD.USERS ? "tab-active" : ""
            }`}
          >
            Users
          </Link>
        </div>
      </div>
    </div>
  );
};

export {AdminTabs};
