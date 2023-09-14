type ContentProps = {
  margin1: string;
  margin2: string;
};

const Content = ({margin1, margin2}: ContentProps) => {
  return (
    <div className="my-4">
      <div
        className="bg-base-300 animate-pulse"
        style={{width: "40%", height: "24px"}}
      ></div>
      <div
        className={`bg-base-300 animate-pulse ${margin1} ${margin2}`}
        style={{width: "80%", height: "16px"}}
      ></div>
    </div>
  );
};

const Content2 = ({margin1, margin2}: ContentProps) => {
  return (
    <div className="my-4">
      <div
        className="bg-base-300 animate-pulse"
        style={{width: "40%", height: "20px"}}
      ></div>
      <div
        className={`bg-base-300 animate-pulse ${margin1} ${margin2}`}
        style={{width: "80%", height: "16px"}}
      ></div>
    </div>
  );
};

const HowItWorksLoading = () => {
  return (
    <div className="pt-16 md:pt-24 w-full max-w-6xl mx-auto flex flex-col md:flex-row sm:items-center gap-5 sm:gap-10 lg:gap-20">
      {/* Image */}
      <div className="w-full h-full flex items-center justify-center md:block">
        <div
          className="bg-base-300 animate-pulse"
          style={{
            width: "100%",
            maxWidth: "715px",
            height: "100%",
            maxHeight: "400px",
            aspectRatio: "16/9",
          }}
        ></div>
      </div>
      {/* Typography */}
      <div className="w-full md:w-2/4 pb-16 md:pb-24">
        <div className="w-full hidden md:block">
          <div
            className="bg-base-300 animate-pulse mb-8"
            style={{width: "100%", maxWidth: "500px", height: "48px"}}
          ></div>
          <Content margin1="mt-2" margin2="mb-5" />
          <Content margin1="mt-2" margin2="mb-5" />
          <Content margin1="mt-2" margin2="mb-5" />
        </div>
        <div className="w-full md:hidden">
          <div
            className="bg-base-300 animate-pulse mb-8"
            style={{width: "60%", maxWidth: "500px", height: "24px"}}
          ></div>
          <Content2 margin1="mt-2" margin2="mb-5" />
          <Content2 margin1="mt-2" margin2="mb-5" />
          <Content2 margin1="mt-2" margin2="mb-5" />
        </div>
      </div>
    </div>
  );
};

export {HowItWorksLoading};
