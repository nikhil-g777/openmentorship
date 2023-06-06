"use client";

import {useState} from "react";
import Image from "next/image";

import Profile from "./Profile";
import Name from "./Name";
import Designation from "./Designation";
import Description from "./Description";
import Interest from "./Interest";
import Skills from "./Skills";
import Provides from "./Provides";
import Socials from "./Socials";

// types
type Data = {
  _id: string;
  firstName: string;
  lastName: string;
  linkedin: string;
  headline: string;
  bio: string;
  interests: string[];
  skills: string[];
  goals: {};
  socialLinks: {
    [key: string]: string;
  };
  profileImageUrls: {
    [key: string]: string;
  };
  email: string;
};

type Props = {
  data: Data | null;
  collapsable: boolean;
};
const Mentor = ({data, collapsable}: Props) => {
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const handleHidden = () => {
    setIsHidden(!isHidden);
  };

  return (
    // Wrapper
    <div className="w-full min-w-full pb-5">
      {data ? (
        <div
          className="w-full h-full items-stretch flex flex-col sm:flex-row gap-5 lg:gap-10 mt-4 p-4 rounded-md border border-base-300"
          key={data._id}
        >
          {/* Profile and action */}
          <Profile buttonText="Send Request" data={data.profileImageUrls} />
          {/* Details */}
          <div className="w-full flex flex-col">
            {/* Mentor name & Linkedin */}
            <div onClick={handleHidden} className="xs:cursor-pointer">
              <Name
                firstName={data.firstName}
                lastName={data.lastName}
                linkedinURI={data.linkedin}
              />
              {/* Designation */}
              <Designation headline={data.headline} />
              {/* Description */}
              <Description bio={data.bio} />
            </div>
            <div
              className={`${isHidden ? "hidden" : ""} sm:block transition-all`}
            >
              {/* Area of Interest */}
              <Interest interests={data.interests} />
              {/* Top Skills */}
              <Skills skills={data.skills} />
              {/* Open to providing */}
              <Provides heading="Open to providing" provides={data.goals} />
              {/* Social Links */}
              <Socials data={data.socialLinks} />
            </div>
            {collapsable ? (
              <Image
                src="/assets/icons/arrow.svg"
                alt="view-more"
                width={20}
                height={20}
                className={`sm:hidden w-5 h-5 mx-auto ${
                  isHidden ? "" : "rotate-180"
                }`}
                onClick={handleHidden}
              />
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default Mentor;
