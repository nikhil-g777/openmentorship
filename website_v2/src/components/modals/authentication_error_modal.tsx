"use client";

import {useCommonStore} from "@/zustand/store";
import Image from "next/image";

const AuthenticationErrorModal = () => {
  const {authenticationError, setAuthenticationError} = useCommonStore();

  // Handle close modal
  const handleClose = () => {
    setAuthenticationError(null);
  };

  return (
    <>
      {/* The button to open modal */}
      <label htmlFor="my-modal-6" className="btn w-0 h-0 hidden">
        open modal
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div
        className={`modal modal-bottom sm:modal-middle ${
          authenticationError ? "modal-open" : ""
        }`}
      >
        <div className="modal-box">
          <h3 className="text-2xl font-bold text-center py-4">
            {authenticationError?.heading}
          </h3>
          <Image
            src="/assets/images/pending.png"
            alt="pending"
            width={150}
            height={150}
            className="mx-auto"
          />
          <h4 className="text-xl font-semibold text-center pt-4">
            {authenticationError?.subHeading}
          </h4>
          <p className="text-center py-4">{authenticationError?.message}</p>
          <div className="modal-action">
            <button
              className="btn rounded-full btn-sm text-sm capitalize btn-outline"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export {AuthenticationErrorModal};
