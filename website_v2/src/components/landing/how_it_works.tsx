import Image from "next/image";

type Props = {};

const HowItWorks = (props: Props) => {
  return (
    <div className="w-full px-4">
      <div className="pt-16 md:pt-24 w-full max-w-6xl mx-auto flex flex-col md:flex-row sm:items-center gap-5 sm:gap-10 lg:gap-20">
        {/* Image */}
        <div className="w-full pb-16 md:pb-24">
          <Image
            src="/assets/images/howItWorks.svg"
            alt="hero"
            className="w-full h-auto"
            width={721}
            height={401}
            data-cy="landing-howItWorks-img"
          />
        </div>
        {/* Typography */}
        <div className="w-full md:w-2/4 pb-16 md:pb-24">
          <h1
            className="text-xl sm:text-heading sm:leading-normal font-bold"
            data-cy="landing-howItWorks-h1"
          >
            How it Works
          </h1>
          <div className="my-4">
            <h2 className="text-lg sm:text-xl font-semibold">Register</h2>
            <h3 className="text-base">Sign up as a mentee or mentor.</h3>
          </div>
          <div className="my-4">
            <h2 className="text-lg sm:text-xl font-semibold">Match</h2>
            <h3 className="text-base">Get Matched with mentees or mentors.</h3>
          </div>
          <div className="my-4">
            <h2 className="text-lg sm:text-xl font-semibold">Chat</h2>
            <h3 className="text-base">
              Engage in a conversation with your mentor or mentee.
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export {HowItWorks};
