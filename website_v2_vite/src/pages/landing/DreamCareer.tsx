// assets
import dreamCareer from "../../assets/images/dreamCareer.svg";

type Props = {};

const DreamCareer = (props: Props) => {
  return (
    <div className="w-full px-4">
      <div className="pt-16 md:pt-24 w-full max-w-6xl mx-auto flex flex-col md:flex-row sm:items-center gap-5 sm:gap-10 lg:gap-20">
        {/* Image */}
        <div className="w-4/5 pb-16 md:pb-24 mx-auto">
          <img src={dreamCareer} alt="hero" className="w-full h-auto" />
        </div>
        {/* Typography */}
        <div className="w-full pb-16 md:pb-24">
          <h1 className="text-xl text-center sm:text-left sm:text-heading sm:leading-normal font-bold">
            Get on the path of your dream career with us today.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default DreamCareer;
