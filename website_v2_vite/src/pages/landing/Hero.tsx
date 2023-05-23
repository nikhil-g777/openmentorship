import Linkedin from "./Linkedin";

// assets
import hero from "../../assets/images/landingHero.svg";

type Props = {};

const Hero = (props: Props) => {
  return (
    <div className="w-full bg-[#F5F3F8] px-4">
      <div className="pt-16 md:pt-24 w-full max-w-6xl mx-auto flex flex-col-reverse md:flex-row sm:items-center gap-5 sm:gap-10 lg:gap-20">
        {/* Typography */}
        <div className="pb-16 md:pb-24">
          <h1 className="text-xl text-center md:text-left sm:text-heading sm:leading-normal font-bold">
            Find a mentor who can help guide you to success.
          </h1>
          <span className="mt-2 block w-full text-center md:text-left">
            Currently open for designers, software professionals
          </span>
          {/* Buttons */}
          <div className="mt-4 flex flex-col md:flex-row items-center gap-2 md:gap-5">
            <Linkedin />
            <span>or</span>
            <button className="block w-48 btn btn-sm btn-primary rounded-full">
              Register
            </button>
          </div>
        </div>
        {/* Image */}
        <div className="w-full">
          <img src={hero} alt="hero" className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
