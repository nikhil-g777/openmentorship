"use client";

import {Carousel} from "./carousel_main";
import {ProfileCard as Profile} from "../profileCard";
import {UserProfile} from "@/types/profile";

type Props = {
  data: UserProfile["user"][];
};

const CarouselWrapper = ({data}: Props) => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <Carousel heading="Recommended based on your profile">
        {data && data.length
          ? data.map((profile: UserProfile["user"]) => (
              <Profile key={profile._id} data={profile} />
            ))
          : null}
      </Carousel>
    </div>
  );
};

export {CarouselWrapper};
