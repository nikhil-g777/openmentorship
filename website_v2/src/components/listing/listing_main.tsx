"use client";

import {UserProfile} from "@/types/profile";
import {ProfileCard as Profile} from "../profileCard";

type Props = {
  data: UserProfile["user"][];
};

const Listing = ({data}: Props) => {
  return (
    <div className="w-full pt-20 px-4 max-w-6xl mx-auto">
      {data && data.length ? (
        <h3 className="font-lg sm:text-xl font-semibold px-4">All Results</h3>
      ) : null}
      {/* Results */}
      {data && data.length
        ? data.map((single: UserProfile["user"]) => (
            <Profile data={single} key={single._id} collapsable={true} />
          ))
        : null}
    </div>
  );
};

export {Listing};
