"use client";

import {useRegisterStore} from "@/zustand/store";
import {useEffect} from "react";

const StepsDots = () => {
  const {token, currentScreen} = useRegisterStore();
  const steps = ["step1", "step2", "step3", "step4", "step5"];
  const currentStepIndex = steps.findIndex(step => step === currentScreen);

  // Show confirmation before reload
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (token.length === 0) {
        return;
      } else {
        e.preventDefault();
        return (e.returnValue = "");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [token]);

  return (
    <div className={`w-full ${currentScreen === "main" ? "hidden" : ""}`}>
      <div className="w-full max-w-3xl mx-auto mt-16 mb-24 px-4 flex justify-center">
        <ul className="steps gap-2 w-full max-w-xs">
          {steps.map((step, index) => (
            <li
              key={step}
              className={`!min-w-[30px] step ${
                index <= currentStepIndex ? "step-primary" : ""
              }`}
            ></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export {StepsDots};
