"use client";

import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  // Handle Reload
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pt-16 pb-20">
      <h3 className="text-2xl font-bold text-center py-4">Oops!</h3>
      <Image
        src="/assets/images/towing.svg"
        alt="not-found"
        width={150}
        height={150}
        className="mx-auto"
      />
      <h4 className="text-xl font-semibold text-center pt-4">
        Requested Page Is Not Found
      </h4>
      <p className="text-center py-4">
        Please check the URL you have entered or try again later.
      </p>
      <div className="flex items-center justify-center gap-4">
        <button
          className="btn rounded-full btn-sm text-sm capitalize btn-outline"
          onClick={handleReload}
        >
          Reload
        </button>
        <Link
          className="btn rounded-full btn-sm text-sm capitalize btn-outline"
          href="/"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
