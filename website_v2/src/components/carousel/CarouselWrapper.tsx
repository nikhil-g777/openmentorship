"use client";

import Carousel from "./Carousel";
import Profile from "../profileCard";
import {profileDetails} from "@/types/userProfile";

type Props = {
  data: profileDetails[];
};

const CarouselWrapper = ({data}: Props) => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <Carousel
        childrenLength={data.length}
        heading="Recommended based on your profile"
      >
        {data.map((profile: any) => (
          <Profile data={profile} key={profile._id} collapsable={true} />
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselWrapper;
