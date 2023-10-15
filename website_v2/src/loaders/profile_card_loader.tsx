"use client";

import {PAGES} from "@/constants/common";
import {useProfileStore} from "@/zustand/store";

const ProfileCardLoader = () => {
  const {currentPage} = useProfileStore();

  return (
    <div className="w-full min-w-full pb-5">
      <div className="w-full h-full items-stretch flex flex-col sm:flex-row gap-5 lg:gap-10 mt-4 p-4 rounded-md border border-base-300">
        {/* Profile */}
        <div className="flex flex-col mx-auto">
          <div
            className="rounded-md bg-base-300 animate-pulse"
            style={{width: "150px", height: "150px"}}
          ></div>
          <div
            className="mt-2 rounded-full bg-base-300 animate-pulse"
            style={{width: "150px", height: "32px"}}
          ></div>
          {currentPage !== PAGES.EXPLORE ? (
            <div
              className="mt-2 rounded-full bg-base-300 animate-pulse"
              style={{width: "150px", height: "32px"}}
            ></div>
          ) : null}
        </div>
        {/* Typography */}
        <div className="w-full flex flex-col">
          {/* Name */}
          <div className="w-full flex justify-center sm:justify-start items-center gap-4 mb-2">
            <div
              className="bg-base-300 animate-pulse"
              style={{width: "176px", height: "32px"}}
            ></div>
            <div
              className="bg-base-300 animate-pulse"
              style={{width: "24px", height: "24px"}}
            ></div>
          </div>
          {/* Designation */}
          <div
            className="my-2 bg-base-300 animate-pulse"
            style={{width: "144px", height: "20px"}}
          ></div>
          {/* Bio */}
          <div className="w-full my-2 flex flex-col justify-center gap-2">
            <div
              className="bg-base-300 animate-pulse"
              style={{width: "96px", height: "20px"}}
            ></div>
            <div
              className="bg-base-300 animate-pulse"
              style={{width: "100%", height: "16px"}}
            ></div>
            <div
              className="bg-base-300 animate-pulse"
              style={{width: "100%", height: "16px"}}
            ></div>
            <div
              className="bg-base-300 animate-pulse mb-2"
              style={{width: "100%", height: "16px"}}
            ></div>
          </div>
          {/* Area of Interest */}
          <div className="hidden sm:block">
            <div className="w-full mb-2 flex flex-col justify-center gap-2">
              <div
                className="bg-base-300 animate-pulse"
                style={{width: "128px", height: "20px"}}
              ></div>
              <div className="flex flex-wrap gap-2 sm:gap-4 mb-2">
                <div
                  className="bg-base-300 animate-pulse"
                  style={{width: "96px", height: "32px"}}
                ></div>
                <div
                  className="bg-base-300 animate-pulse"
                  style={{width: "144px", height: "32px"}}
                ></div>
                <div
                  className="bg-base-300 animate-pulse"
                  style={{width: "128px", height: "32px"}}
                ></div>
                <div
                  className="bg-base-300 animate-pulse"
                  style={{width: "112px", height: "32px"}}
                ></div>
              </div>
            </div>
            {/* Top Skills */}
            <div className="w-full mb-2 flex flex-col justify-center gap-2">
              <div
                className="bg-base-300 animate-pulse"
                style={{width: "128px", height: "20px"}}
              ></div>
              <div className="flex flex-wrap gap-2 sm:gap-4 mb-2">
                <div
                  className="bg-base-300 animate-pulse"
                  style={{width: "112px", height: "32px"}}
                ></div>
                <div
                  className="bg-base-300 animate-pulse"
                  style={{width: "144px", height: "32px"}}
                ></div>
                <div
                  className="bg-base-300 animate-pulse"
                  style={{width: "96px", height: "32px"}}
                ></div>
                <div
                  className="bg-base-300 animate-pulse"
                  style={{width: "128px", height: "32px"}}
                ></div>
              </div>
            </div>
            {/* Open to Providing */}
            <div className="w-full mb-2 flex flex-col justify-center gap-2">
              <div
                className="bg-base-300 animate-pulse"
                style={{width: "128px", height: "20px"}}
              ></div>
              <div className="flex flex-wrap gap-2 sm:gap-4 mb-2">
                <div
                  className="bg-base-300 animate-pulse"
                  style={{width: "112px", height: "32px"}}
                ></div>
                <div
                  className="bg-base-300 animate-pulse"
                  style={{width: "128px", height: "32px"}}
                ></div>
                <div
                  className="bg-base-300 animate-pulse"
                  style={{width: "144px", height: "32px"}}
                ></div>
                <div
                  className="bg-base-300 animate-pulse"
                  style={{width: "96px", height: "32px"}}
                ></div>
              </div>
            </div>
            {/* Social Links */}
            <div className="w-full my-2">
              <div className="flex flex-wrap gap-2 sm:gap-4 mb-4">
                <div className="btn btn-sm btn-circle border-none bg-base-300 animate-pulse"></div>
                <div className="btn btn-sm btn-circle border-none bg-base-300 animate-pulse"></div>
                <div className="btn btn-sm btn-circle border-none bg-base-300 animate-pulse"></div>
                <div className="btn btn-sm btn-circle border-none bg-base-300 animate-pulse"></div>
                <div className="btn btn-sm btn-circle border-none bg-base-300 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export {ProfileCardLoader};
