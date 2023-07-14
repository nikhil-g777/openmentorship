"use client";

import {Carousel} from "./carousel_main";
import {ProfileCard as Profile} from "../profileCard";
import {UserProfile} from "@/types/profile";
import {useCarouselStore} from "@/zustand/store";

const CarouselWrapper = () => {
  const {carouselData} = useCarouselStore();
  return (
    <div className="w-full max-w-6xl mx-auto">
      <Carousel heading="Recommended based on your profile">
        {carouselData && carouselData.length
          ? carouselData.map((profile: UserProfile["user"]) => (
              <Profile key={profile._id} data={profile} />
            ))
          : null}
      </Carousel>
    </div>
  );
};

export {CarouselWrapper};
