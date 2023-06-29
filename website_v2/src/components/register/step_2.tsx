"use client";

import {useRegisterStore} from "@/zustand/store";
import {FieldsProvider} from "./fields_provider";

const Step2 = () => {
  const {currentScreen} = useRegisterStore();
  return (
    <div className={`w-full ${currentScreen === "step2" ? "" : "hidden"}`}>
      <div className="w-full max-w-3xl mx-auto mt-8 px-4">
        {/* Heading */}
        <h1 className="text-xl text-center sm:text-sub_heading sm:leading-normal">
          About You
        </h1>
        {/* Work Experience */}
        <FieldsProvider
          heading="Work Experience"
          buttonText="Add Experience"
          inputOnePlaceholder="Organization"
          inputTwoPlaceholder="Title"
        />
        {/* Education */}
        <FieldsProvider
          heading="Education"
          buttonText="Add Education"
          inputOnePlaceholder="School"
          inputTwoPlaceholder="Degree"
        />
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

export {Step2};
