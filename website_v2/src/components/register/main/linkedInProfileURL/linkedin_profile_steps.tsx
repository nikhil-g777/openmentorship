"use client";

import {useProfileStore} from "@/zustand/store";
import {DesktopGuidelines} from "./desktop_guidelines";
import {MobileGuidelines} from "./mobile_guidelines";
import {Source} from "./source";
import {Tabs} from "./tabs";

const LinkedInProfileSteps = () => {
  const {currentTab} = useProfileStore();

  return (
    <div className="">
      {/* The button to open modal */}
      <div className="w-full flex items-center justify-between">
        <label
          htmlFor="my-modal-6"
          className="lowercase font-semibold btn btn-xs btn-circle btn-outline"
        >
          i
        </label>
      </div>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          {/* Tile */}
          <div className="mb-4">
            <h3 className="font-lg sm:text-xl font-semibold text-center">
              Find your LinkedIn public profile URL
            </h3>
          </div>
          {/* Tabs */}
          <Tabs />
          {/* Desktop Guide */}
          {currentTab === "" ? <DesktopGuidelines /> : null}
          {/* Mobile Guide */}
          {currentTab === "mobile" ? <MobileGuidelines /> : null}
          {/* Source */}
          <Source />
          <div className="modal-action">
            <label
              className="btn rounded-full btn-sm text-sm capitalize btn-outline"
              htmlFor="my-modal-6"
            >
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export {LinkedInProfileSteps};
