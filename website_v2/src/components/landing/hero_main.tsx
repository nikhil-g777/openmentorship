"use client";

import {useSession} from "next-auth/react";
import Image from "next/image";
import dynamic from "next/dynamic";
// Dynamically load non SSR component
const Auth = dynamic<{}>(() => import("./auth").then(mod => mod.Auth), {
  ssr: false,
});

const Hero = () => {
  const {status} = useSession();

  return (
    <div className="w-full bg-[#F5F3F8] px-4">
      <div className="pt-16 md:pt-24 w-full max-w-6xl mx-auto flex flex-col-reverse md:flex-row sm:items-center gap-5 sm:gap-10 lg:gap-20">
        {/* Typography */}
        <div className="pb-16 md:pb-24">
          <h1
            className="text-xl text-center md:text-left sm:text-heading sm:leading-normal font-bold"
            data-cy="landing-hero-h1"
          >
            Find a mentor who can help guide you to success.
          </h1>
          <span className="mt-2 block w-full text-center md:text-left">
            Currently open for designers, software professionals
          </span>
          {/* Buttons */}
          {status === "unauthenticated" ? <Auth /> : null}
        </div>
        {/* Image */}
        <div className="w-full">
          <Image
            src="/assets/images/landingHero.svg"
            alt="hero"
            className="w-full h-auto"
            width={515}
            height={638}
            data-cy="landing-hero-img"
          />
        </div>
      </div>
    </div>
  );
};

export {Hero};
