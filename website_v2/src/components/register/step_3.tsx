"use client";

import {useRegisterStore} from "@/zustand/store";
import {TagsProvider} from "./tags_provider";

const Step3 = () => {
  const {currentScreen} = useRegisterStore();
  return (
    <div className={`w-full ${currentScreen === "step3" ? "" : "hidden"}`}>
      <div className="w-full max-w-3xl mx-auto mt-8 px-4">
        {/* Heading */}
        <h1 className="text-xl text-center sm:text-sub_heading sm:leading-normal">
          Let&apos;s get more specific
        </h1>
        {/* Skills */}
        <TagsProvider heading="What are some of your top skills?" />
        {/* Interests */}
        <TagsProvider heading="What are your areas of interest?" />
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

export {Step3};
