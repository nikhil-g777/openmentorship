"use client";

import {resendConfirmationEmail} from "@/endpoints/user";
import {useCommonStore, useRegisterStore} from "@/zustand/store";
import Image from "next/image";
import {useState} from "react";

const AuthenticationErrorModal = () => {
  const {
    authenticationError,
    setAuthenticationError,
    setErrorAlert,
    setSuccessAlert,
  } = useCommonStore();
  const {userId, userType, email, firstName, lastName} = useRegisterStore();
  const [loading, setLoading] = useState<boolean>(false);

  // Handle close modal
  const handleClose = () => {
    setAuthenticationError(null);
  };

  // Handle Resend Confirmation Email
  const handleResendConfirmationEmail = async () => {
    setLoading(true);

    const res = await resendConfirmationEmail({
      _id: userId,
      userType,
      email,
      firstName,
      lastName,
    });
    if (res.success) {
      setSuccessAlert("Confirmation email sent successfully!", 6);
      handleClose();
    }
    if (!res.success)
      setErrorAlert("Something went wrong, please try again later!", 6);

    setLoading(false);
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
            {/* Resend Confirmation */}
            {authenticationError?.heading ===
            "Registration Pending Confirmation" ? (
              <button
                className={`btn rounded-full btn-sm text-sm capitalize btn-outline ${
                  loading ? "loading" : ""
                }`}
                onClick={handleResendConfirmationEmail}
                disabled={loading}
              >
                {loading
                  ? "Sending Confirmation Email..."
                  : "Resend Confirmation Email"}
              </button>
            ) : null}
            {/* Close */}
            <button
              className="btn rounded-full btn-sm text-sm capitalize btn-outline"
              onClick={handleClose}
              disabled={loading}
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
