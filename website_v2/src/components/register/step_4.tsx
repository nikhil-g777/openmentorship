"use client";

import {useRegisterStore} from "@/zustand/store";
import {MenteePreferences} from "./mentee_preferences";

const Step4 = () => {
  const {currentScreen} = useRegisterStore();
  return (
    <div className={`w-full ${currentScreen === "step4" ? "" : "hidden"}`}>
      <div className="w-full max-w-3xl mx-auto mt-8 px-4">
        {/* Heading */}
        <h1 className="text-xl text-center sm:text-sub_heading sm:leading-normal">
          Mentorship
        </h1>
        <MenteePreferences />
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

export {Step4};
