"use client";

import {useRegisterStore} from "@/zustand/store";

const Step5 = () => {
  const {currentScreen} = useRegisterStore();
  return (
    <div className={`w-full ${currentScreen === "step5" ? "" : "hidden"}`}>
      <div className="w-full max-w-3xl mx-auto mt-8 px-4">
        {/* Heading */}
        <h1 className="text-xl text-center sm:text-sub_heading sm:leading-normal">
          Add your Social Media links
        </h1>
        {/* Links */}
        <div className="w-full flex flex-col gap-4 mt-8">
          {/* Twitter */}
          <div className="w-full flex flex-col md:flex-row md:items-center gap-2">
            <label htmlFor="twitter" className="text-base md:text-lg md:w-1/6">
              Twitter
            </label>
            <input
              className="input input-bordered w-full"
              id="twitter"
              placeholder="https://"
            />
          </div>
          {/* Medium */}
          <div className="w-full flex flex-col md:flex-row md:items-center gap-2">
            <label htmlFor="medium" className="text-base md:text-lg md:w-1/6">
              Medium
            </label>
            <input
              className="input input-bordered w-full"
              id="medium"
              placeholder="https://"
            />
          </div>
          {/* Behance */}
          <div className="w-full flex flex-col md:flex-row md:items-center gap-2">
            <label htmlFor="behance" className="text-base md:text-lg md:w-1/6">
              Behance
            </label>
            <input
              className="input input-bordered w-full"
              id="behance"
              placeholder="https://"
            />
          </div>
          {/* GitHub */}
          <div className="w-full flex flex-col md:flex-row md:items-center gap-2">
            <label htmlFor="github" className="text-base md:text-lg md:w-1/6">
              GitHub
            </label>
            <input
              className="input input-bordered w-full"
              id="github"
              placeholder="https://"
            />
          </div>
          {/* Portfolio */}
          <div className="w-full flex flex-col md:flex-row md:items-center gap-2">
            <label
              htmlFor="portfolio"
              className="text-base md:text-lg md:w-1/6"
            >
              Portfolio
            </label>
            <input
              className="input input-bordered w-full"
              id="portfolio"
              placeholder="https://"
            />
          </div>
          {/* Other */}
          <div className="w-full flex flex-col md:flex-row md:items-center gap-2">
            <label htmlFor="other" className="text-base md:text-lg md:w-1/6">
              Other
            </label>
            <input
              className="input input-bordered w-full"
              id="other"
              placeholder="https://"
            />
          </div>
        </div>
        {/* Continue */}
        <div className="w-full my-8 text-center">
          <button className="w-48 btn btn-outline btn-accent rounded-full hover:text-white">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export {Step5};
