"use client";

import {useCommonStore} from "@/zustand/store";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import React, {useEffect, useTransition} from "react";

const Tabs = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const currentTab = params.get("tab");
  const {setRouteActionLoading} = useCommonStore();
  const [isPending, startTransition] = useTransition();

  // Handle Click
  const handleClick = (tab: string) => {
    startTransition(() => {
      const path = pathname + "?tab=" + tab;
      router.push(path);
      router.refresh();
    });
  };

  // Update Route Action Loading
  useEffect(() => {
    setRouteActionLoading(isPending);
  }, [setRouteActionLoading, isPending]);

  return (
    <div className="w-full">
      <div className="w-full max-w-6xl mx-auto flex justify-center mt-4">
        <div className="tabs tabs-boxed">
          <button
            className={`tab sm:tab-md lg:tab-lg ${
              currentTab === "active" || currentTab === "" || !currentTab
                ? "tab-active"
                : ""
            }`}
            onClick={() => handleClick("active")}
          >
            Active
          </button>
          <button
            className={`tab sm:tab-md lg:tab-lg ${
              currentTab === "pending" ? "tab-active" : ""
            }`}
            onClick={() => handleClick("pending")}
          >
            Pending
          </button>
          <button
            className={`tab sm:tab-md lg:tab-lg ${
              currentTab === "closed" ? "tab-active" : ""
            }`}
            onClick={() => handleClick("closed")}
          >
            Closed
          </button>
        </div>
      </div>
    </div>
  );
};

export {Tabs};
