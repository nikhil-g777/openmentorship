const Content1 = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-20">
      <div className="my-4 hidden md:block">
        <div
          className="bg-base-300 animate-pulse mb-2"
          style={{width: "20vw", maxWidth: "200px", height: "28px"}}
        ></div>
        <div
          className="bg-base-300 animate-pulse"
          style={{width: "25vw", maxWidth: "350px", height: "72px"}}
        ></div>
      </div>
      <div className="my-4 hidden md:block">
        <div
          className="bg-base-300 animate-pulse mb-2"
          style={{width: "20vw", maxWidth: "200px", height: "28px"}}
        ></div>
        <div
          className="bg-base-300 animate-pulse"
          style={{width: "25vw", maxWidth: "350px", height: "72px"}}
        ></div>
      </div>
    </div>
  );
};
const Content2 = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-20">
      <div className="my-4 md:hidden">
        <div
          className="bg-base-300 animate-pulse mb-2"
          style={{width: "60vw", height: "28px"}}
        ></div>
        <div
          className="bg-base-300 animate-pulse"
          style={{width: "90vw", height: "72px"}}
        ></div>
      </div>
      <div className="my-4 md:hidden">
        <div
          className="bg-base-300 animate-pulse mb-2"
          style={{width: "60vw", height: "28px"}}
        ></div>
        <div
          className="bg-base-300 animate-pulse"
          style={{width: "90vw", height: "72px"}}
        ></div>
      </div>
    </div>
  );
};

const WhyOpenMentorshipLoading = () => {
  return (
    <div className="pt-16 md:pt-24 w-full max-w-6xl mx-auto flex flex-col md:flex-row sm:items-center gap-5 sm:gap-10 lg:gap-20">
      {/* Heading */}
      <div className="md:pb-24">
        <div
          className="bg-base-300 animate-pulse hidden md:block mb-8"
          style={{width: "250px", height: "48px"}}
        ></div>
        <div
          className="bg-base-300 animate-pulse hidden md:block mb-8"
          style={{width: "280px", height: "48px"}}
        ></div>
        <div
          className="bg-base-300 animate-pulse md:hidden mb-8"
          style={{width: "80vw", height: "24px"}}
        ></div>
      </div>
      {/* Points */}
      <div className="w-full flex flex-col pb-16 md:pb-24 overflow-x-hidden">
        <Content1 />
        <Content1 />
        <Content2 />
        <Content2 />
      </div>
    </div>
  );
};

export {WhyOpenMentorshipLoading};
