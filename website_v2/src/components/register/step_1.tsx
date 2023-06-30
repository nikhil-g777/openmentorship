"use client";

import {useRegisterStore} from "@/zustand/store";
import {useState} from "react";

const Step1 = () => {
  const {
    currentScreen,
    setCurrentScreen,
    userType,
    setUserType,
    careerStatus,
    setCareerStatus,
    areasOfInterest,
    setAreasOfInterest,
  } = useRegisterStore();
  const [error, setError] = useState("");

  // Handle career status change
  const handleCareerStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCareerStatus(e.target.value);
  };

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = e.target;
    if (name === "other" && checked) {
      setAreasOfInterest({
        software: false,
        design: false,
        other: true,
      });
    } else {
      setAreasOfInterest({...areasOfInterest, [name]: checked, other: false});
    }
  };

  // Handle continue
  const handleContinue = () => {
    // Reset error
    setError("");

    // Validate
    if (
      !areasOfInterest.software &&
      !areasOfInterest.design &&
      !areasOfInterest.other
    ) {
      setError("Please select at least one area of interest");
      return;
    }

    // Move to next screen
    setCurrentScreen("step2");
  };

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
            I am registering as a:{" "}
            <b>{userType === "mentee" ? "Mentee" : "Mentor"}</b>
          </p>
          <div className="btn-group mt-2">
            <button
              className={`btn ${userType === "mentee" ? "btn-active" : ""}`}
              onClick={() => setUserType("mentee")}
            >
              Mentee
            </button>
            <button
              className={`btn ${userType === "mentor" ? "btn-active" : ""}`}
              onClick={() => setUserType("mentor")}
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
            value={careerStatus}
            onChange={handleCareerStatusChange}
          >
            <option value="Student">Student</option>
            <option value="Professional">Professional</option>
          </select>
        </div>
        {/* Area of Interest */}
        <div className="w-full mt-8">
          <p className="text-base md:text-lg">What is your area of interest?</p>
          <div className="form-control mt-2">
            <label className="label cursor-pointer justify-start gap-2">
              <input
                type="checkbox"
                name="software"
                className="checkbox checkbox-primary"
                checked={areasOfInterest.software}
                onChange={handleCheckboxChange}
              />
              <span className="label-text text-base">Software</span>
            </label>
            <label className="label cursor-pointer justify-start gap-2">
              <input
                type="checkbox"
                name="design"
                className="checkbox checkbox-primary"
                checked={areasOfInterest.design}
                onChange={handleCheckboxChange}
              />
              <span className="label-text text-base">Design</span>
            </label>
            <label className="label cursor-pointer justify-start gap-2">
              <input
                type="checkbox"
                name="other"
                className="checkbox checkbox-primary"
                checked={areasOfInterest.other}
                onChange={handleCheckboxChange}
              />
              <span className="label-text text-base">Other</span>
            </label>
            {/* Error */}
            {error.length ? (
              <label className="label">
                <span className="label-text-alt text-error">{error}</span>
              </label>
            ) : null}
          </div>
        </div>
        {/* Continue */}
        <div className="w-full my-8 text-center">
          <button
            className="w-48 btn btn-outline btn-accent rounded-full hover:text-white"
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export {Step1};
