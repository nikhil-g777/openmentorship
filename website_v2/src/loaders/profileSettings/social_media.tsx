const Content = () => {
  return (
    <div className="w-full flex flex-col md:flex-row md:items-center gap-2">
      <div
        className="bg-base-300 animate-pulse mt-8 mb-4"
        style={{width: "105px", height: "28px"}}
      ></div>
      <div
        className="bg-base-300 animate-pulse"
        style={{width: "100%", height: "48px"}}
      ></div>
    </div>
  );
};

const SocialMedia = () => {
  return (
    <div className="w-full px-4">
      <div
        className="bg-base-300 animate-pulse mt-8 mb-4"
        style={{width: "175px", height: "28px"}}
      ></div>
      <div className="w-full flex flex-col gap-4 mt-8">
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
      </div>
    </div>
  );
};

export {SocialMedia};
