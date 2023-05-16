import { useState } from "react";

import Profile from "./Profile";
import Name from "./Name";
import Designation from "./Designation";
import Description from "./Description";
import Interest from "./Interest";
import Skills from "./Skills";
import Provides from "./Provides";

// assets
import arrow from "../../assets/icons/arrow.svg";

// types
type Data = {
  id: number;
  name: string;
  linkedin: string;
  designation: string;
  experience: string;
  description: string;
  interest: string;
  skills: string;
  provides: string[];
  email: string;
};

type Props = {
  data: Data | null;
};
const Mentor = ({ data }: Props) => {
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const handleHidden = () => {
    setIsHidden(!isHidden);
  };

  return (
    // wrapper
    <div className="w-full min-w-full py-[5%]">
      {data ? (
        <div
          className="w-full h-full items-stretch flex flex-col sm:flex-row gap-5 lg:gap-10 mt-4 p-4 rounded-md border border-base-300"
          key={data.id}
        >
          {/* Profile and action */}
          <Profile />
          {/* Details */}
          <div className="flex flex-col">
            {/* Mentor name & Linkedin */}
            <div onClick={handleHidden} className="xs:cursor-pointer">
              <Name name={data.name} linkedinURI={data.linkedin} />
              {/* Designation */}
              <Designation
                designation={data.designation}
                experience={data.experience}
              />
              {/* Description */}
              <Description description={data.description} />
            </div>
            <div
              className={`${isHidden ? "hidden" : ""} sm:block transition-all`}
            >
              {/* Area of Interest */}
              <Interest interest={data.interest} />
              {/* Top Skills */}
              <Skills skills={data.skills} />
              {/* Open to providing */}
              <Provides provides={data.provides} />
            </div>
            <img
              src={arrow}
              alt="view-more"
              className={`sm:hidden w-5 h-5 mx-auto ${
                isHidden ? "" : "rotate-180"
              }`}
              onClick={handleHidden}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default Mentor;
