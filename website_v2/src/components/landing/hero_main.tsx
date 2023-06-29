"use client";

import {useSession} from "next-auth/react";
import {Linkedin} from "./linkedin_main";
import Image from "next/image";
import Link from "next/link";

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
          {status === "unauthenticated" ? (
            <div className="mt-4 w-full flex flex-col justify-center items-center gap-2 md:flex-row md:justify-start md:gap-4">
              <Linkedin />
              <div className="text-center">or</div>
              <Link
                href="/register"
                className="w-48 btn btn-sm btn-primary rounded-full"
                data-cy="landing-hero-register-button"
              >
                Register
              </Link>
            </div>
          ) : null}
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
