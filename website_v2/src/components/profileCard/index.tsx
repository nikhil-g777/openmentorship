"use client";

import {useState} from "react";
import Image from "next/image";

import {Profile} from "./profile";
import {Name} from "./name";
import {Designation} from "./designation";
import {Description} from "./description";
import {Interest} from "./interest";
import {Skills} from "./skills";
import {Provides} from "./provides";
import {Socials} from "./socials";
import {UserProfile} from "@/types/profile";
import {useCommonStore, useProfileStore} from "@/zustand/store";
import {ProfileCardLoader} from "@/loaders/profile_card_loader";

type Props = {
  data: UserProfile["user"] | null;
};
const ProfileCard = ({data}: Props) => {
  const {collapsable} = useProfileStore();
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const {routeActionLoading} = useCommonStore();

  const handleHidden = () => {
    setIsHidden(!isHidden);
  };

  return (
    <>
      {routeActionLoading ? (
        <ProfileCardLoader />
      ) : (
        // Wrapper
        <div className="w-full min-w-full pb-5" key={data?._id}>
          {data ? (
            <div className="w-full h-full items-stretch flex flex-col sm:flex-row gap-5 lg:gap-10 mt-4 p-4 rounded-md border border-base-300">
              {/* Profile and action */}
              <Profile data={data.profileImageUrls} rootData={data} />
              {/* Details */}
              <div className="w-full flex flex-col">
                {/* Mentor name & Linkedin */}
                <div onClick={handleHidden} className="xs:cursor-pointer">
                  <Name
                    firstName={data.firstName}
                    lastName={data.lastName}
                    linkedinURI={data.linkedInId}
                  />
                  {/* Designation */}
                  <Designation headline={data.headline} />
                  {/* Description */}
                  <Description bio={data.bio} />
                </div>
                <div
                  className={`${
                    isHidden ? "hidden" : ""
                  } sm:block transition-all`}
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
      )}
    </>
  );
};
export {ProfileCard};
