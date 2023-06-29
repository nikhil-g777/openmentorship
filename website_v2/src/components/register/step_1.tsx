"use client";

import {useRegisterStore} from "@/zustand/store";
import {useState} from "react";

const Step1 = () => {
  const {currentScreen} = useRegisterStore();
  const [isMentee, setIsMentee] = useState(true);
  return (
    <div className={`w-full ${currentScreen === "step1" ? "" : "hidden"}`}>
      <div className="w-full max-w-3xl mx-auto mt-8 px-4">
        {/* Heading */}
        <h1 className="text-xl text-center sm:text-sub_heading sm:leading-normal">
          Tell us a little bit about yourself, it helps make the right
          connections
        </h1>
        {/* Account Type */}
        <div className="w-full mt-8">
          <p className="text-base md:text-lg">
            I am registering as a: <b>{isMentee ? "Mentee" : "Mentor"}</b>
          </p>
          <div className="btn-group mt-2">
            <button
              className={`btn ${isMentee ? "btn-active" : ""}`}
              onClick={() => setIsMentee(true)}
            >
              Mentee
            </button>
            <button
              className={`btn ${isMentee ? "" : "btn-active"}`}
              onClick={() => setIsMentee(false)}
            >
              Mentor
            </button>
          </div>
        </div>
        {/* Student or Professional */}
        <div className="w-full mt-8">
          <p className="text-base md:text-lg">
            Which of the following best describes you?
          </p>
          <select
            className="select select-bordered w-full mt-2"
            defaultValue="student"
          >
            <option value="student">Student</option>
            <option value="professional">Professional</option>
          </select>
        </div>
        {/* Area of Interest */}
        <div className="w-full mt-8">
          <p className="text-base md:text-lg">What is your area of interest?</p>
          <div className="form-control mt-2">
            <label className="label cursor-pointer justify-start gap-2">
              <input type="checkbox" className="checkbox checkbox-primary" />
              <span className="label-text text-base">Software</span>
            </label>
            <label className="label cursor-pointer justify-start gap-2">
              <input type="checkbox" className="checkbox checkbox-primary" />
              <span className="label-text text-base">Design</span>
            </label>
            <label className="label cursor-pointer justify-start gap-2">
              <input type="checkbox" className="checkbox checkbox-primary" />
              <span className="label-text text-base">Other</span>
            </label>
          </div>
        </div>
        {/* Continue */}
        <div className="w-full my-8 text-center">
          <button className="w-48 btn btn-outline btn-accent rounded-full hover:text-white ">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export {Step1};
