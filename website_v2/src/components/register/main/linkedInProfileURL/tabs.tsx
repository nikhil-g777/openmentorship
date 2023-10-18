"use client";

import {TABS} from "@/constants/common";
import {useProfileStore} from "@/zustand/store";

const Tabs = () => {
  const {currentTab, setCurrentTab} = useProfileStore();
  return (
    <div className="w-full flex items-center justify-center mb-4">
      <div className="tabs tabs-boxed">
        <div
          onClick={() => setCurrentTab(TABS.GUIDELINES.DESKTOP)}
          className={`tab ${
            currentTab === TABS.GUIDELINES.DESKTOP ? "tab-active" : ""
          }`}
        >
          Desktop
        </div>
        <div
          onClick={() => setCurrentTab(TABS.GUIDELINES.MOBILE)}
          className={`tab ${
            currentTab === TABS.GUIDELINES.MOBILE ? "tab-active" : ""
          }`}
        >
          Mobile
        </div>
      </div>
    </div>
  );
};

export {Tabs};
