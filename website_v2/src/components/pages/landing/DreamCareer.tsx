import Image from "next/image";

const DreamCareer = () => {
  return (
    <div className="w-full px-4">
      <div className="pt-16 md:pt-24 w-full max-w-6xl mx-auto flex flex-col md:flex-row sm:items-center gap-5 sm:gap-10 lg:gap-20">
        {/* Image */}
        <div className="w-4/5 pb-16 md:pb-24 mx-auto">
          <Image
            src="/assets/images/dreamCareer.svg"
            alt="hero"
            className="w-full h-auto"
            width={415}
            height={332}
            data-cy="landing-dreamCareer-img"
          />
        </div>
        {/* Typography */}
        <div className="w-full pb-16 md:pb-24">
          <h1
            className="text-xl text-center sm:text-left sm:text-heading sm:leading-normal font-bold"
            data-cy="landing-dreamCareer-h1"
          >
            Get on the path of your dream career with us today.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default DreamCareer;
