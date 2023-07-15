"use client";

import {UserProfile} from "@/types/profile";
import {ProfileCard as Profile} from "../profileCard";
import {useListingStore} from "@/zustand/store";

const Listing = () => {
  const {listingData, heading} = useListingStore();
  return (
    <div className="w-full pt-20 px-4 max-w-6xl mx-auto">
      {listingData && listingData.length && heading && heading.length ? (
        <h3 className="font-lg sm:text-xl font-semibold px-4">{heading}</h3>
      ) : null}
      {/* Results */}
      {listingData && listingData.length
        ? listingData.map((profile: UserProfile["user"]) => (
            <Profile key={profile._id} data={profile} />
          ))
        : null}
    </div>
  );
};

export {Listing};
