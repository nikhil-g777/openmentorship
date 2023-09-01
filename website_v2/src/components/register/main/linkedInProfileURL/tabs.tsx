"use client";

import {useProfileStore} from "@/zustand/store";

const Tabs = () => {
  const {currentTab, setCurrentTab} = useProfileStore();
  return (
    <div className="w-full flex items-center justify-center mb-4">
      <div className="tabs tabs-boxed">
        <div
          onClick={() => setCurrentTab("")}
          className={`tab ${currentTab === "" ? "tab-active" : ""}`}
        >
          Desktop
        </div>
        <div
          onClick={() => setCurrentTab("mobile")}
          className={`tab ${currentTab === "mobile" ? "tab-active" : ""}`}
        >
          Mobile
        </div>
      </div>
    </div>
  );
};

export {Tabs};
