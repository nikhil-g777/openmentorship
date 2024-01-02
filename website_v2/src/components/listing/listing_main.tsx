"use client";

import {UserProfile} from "@/types/profile";
import {ProfileCard as Profile} from "../profileCard";
import {useListingStore} from "@/zustand/store";

type Props = {
  data?: UserProfile["user"][];
  dataHeading?: string;
};

const Listing = ({data, dataHeading}: Props) => {
  const {listingData, heading} = useListingStore();

  return (
    <div className="w-full pt-20 px-4 max-w-6xl mx-auto">
      {/* Heading */}
      {data && data.length && dataHeading && dataHeading.length ? (
        <h3 className="font-lg sm:text-xl font-semibold px-4">{dataHeading}</h3>
      ) : null}
      {!data &&
      listingData &&
      listingData.length &&
      heading &&
      heading.length ? (
        <h3 className="font-lg sm:text-xl font-semibold px-4">{heading}</h3>
      ) : null}
      {/* Results */}
      {data && data.length
        ? data.map((profile: UserProfile["user"]) => (
            <Profile key={profile._id} data={profile} />
          ))
        : null}
      {!data && listingData && listingData.length
        ? listingData.map((profile: UserProfile["user"]) => (
            <Profile key={profile._id} data={profile} />
          ))
        : null}
    </div>
  );
};

export {Listing};
