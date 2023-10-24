"use client";

import {useEffect, useState} from "react";

const CookieConsent = () => {
  const [cookieConsent, setCookieConsent] = useState<null | string>(null);

  useEffect(() => {
    const cookieConsent = localStorage.getItem(
      "open_mentorship_cookie_consent"
    );
    // Check cookie consent with expiry
    if (cookieConsent) {
      const data = JSON.parse(cookieConsent);
      if (new Date() >= new Date(data.expiry)) {
        localStorage.removeItem("open_mentorship_cookie_consent");
        setCookieConsent("false");
      } else {
        setCookieConsent("true");
      }
    } else {
      setCookieConsent("false");
    }
  }, [setCookieConsent]);

  // Handle cookie consent
  const handleCookieConsent = () => {
    // Set date to 6months from now;
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 6);
    const data = {
      expiry: expiryDate,
    };
    localStorage.setItem(
      "open_mentorship_cookie_consent",
      JSON.stringify(data)
    );
    setCookieConsent("true");
  };

  if (cookieConsent === "true" || cookieConsent === null) return null;

  return (
    <div className="p-4 fixed left-0 right-0 bottom-0 flex flex-col items-center justify-end z-[55]">
      <div className="alert text-neutral shadow-lg w-full max-w-6xl mb-4">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-primary flex-shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>
            We use cookies to improve your experience on our website. By
            clicking &apos;<b>I understand</b>,&apos; you agree to our use of
            cookies.
          </span>
        </div>
        <div className="flex-none place-self-end">
          <button
            className="btn btn-sm btn-primary normal-case"
            onClick={handleCookieConsent}
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export {CookieConsent};
