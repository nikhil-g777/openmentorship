const HeroLoading = () => {
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col-reverse md:flex-row sm:items-center gap-5 sm:gap-10 lg:gap-20 pt-16 md:pt-24">
      {/* Typography */}
      <div className="w-full pb-16 md:pb-24">
        <div className="w-full hidden md:block">
          <div
            className="bg-base-300 animate-pulse"
            style={{width: "100%", maxWidth: "500px", height: "48px"}}
          ></div>
          <div
            className="bg-base-300 animate-pulse mt-8"
            style={{width: "80%", height: "48px"}}
          ></div>
          <div
            className="bg-base-300 animate-pulse mt-8"
            style={{width: "60%", height: "48px"}}
          ></div>
          <div
            className="bg-base-300 animate-pulse mt-8"
            style={{width: "100%", height: "24px"}}
          ></div>
        </div>
        <div className="w-full md:hidden">
          <div
            className="bg-base-300 animate-pulse mx-auto"
            style={{width: "100%", maxWidth: "500px", height: "24px"}}
          ></div>
          <div
            className="bg-base-300 animate-pulse mt-4 mx-auto"
            style={{width: "80%", height: "24px"}}
          ></div>
          <div
            className="bg-base-300 animate-pulse mt-4 mx-auto"
            style={{width: "60%", height: "24px"}}
          ></div>
          <div
            className="bg-base-300 animate-pulse mt-4 mx-auto"
            style={{width: "100%", height: "16px"}}
          ></div>
        </div>
        <div className="mt-4 w-full flex flex-col justify-center items-center gap-2 md:flex-row md:justify-start md:gap-4">
          <div
            className="bg-base-300 rounded-md animate-pulse"
            style={{width: "192px", height: "32px"}}
          ></div>
          <div
            className="bg-base-300 animate-pulse"
            style={{width: "16px", height: "24px"}}
          ></div>
          <div
            className="bg-base-300 rounded-full animate-pulse"
            style={{width: "192px", height: "32px"}}
          ></div>
        </div>
      </div>
      {/* Image */}
      <div className="w-full h-full flex items-center justify-center md:block">
        <div
          className="bg-base-300 animate-pulse"
          style={{
            width: "100%",
            maxWidth: "550px",
            height: "100%",
            maxHeight: "445px",
            aspectRatio: "1/1",
          }}
        ></div>
      </div>
    </div>
  );
};

export {HeroLoading};
