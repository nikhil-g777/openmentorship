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
      <Carousel
        childrenLength={data.length}
        heading="Recommended based on your profile"
      >
        {data.map((profile: UserProfile["user"]) => (
          <Profile data={profile} key={profile._id} collapsable={true} />
        ))}
      </Carousel>
    </div>
  );
};

export {CarouselWrapper};
