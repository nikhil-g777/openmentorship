const DreamCareerLoading = () => {
  return (
    <div className="pt-16 md:pt-24 w-full max-w-6xl mx-auto flex flex-col md:flex-row sm:items-center gap-5 sm:gap-10 lg:gap-20">
      {/* Image */}
      <div className="w-full h-full flex items-center justify-center md:block pb-16 md:pb-24">
        <div
          className="bg-base-300 animate-pulse"
          style={{
            width: "100%",
            maxWidth: "475px",
            height: "100%",
            maxHeight: "380px",
            aspectRatio: "1/1",
          }}
        ></div>
      </div>
      {/* Typography */}
      <div className="w-full pb-16 md:pb-24">
        <div
          className="bg-base-300 animate-pulse hidden md:block"
          style={{width: "100%", height: "48px"}}
        ></div>
        <div
          className="bg-base-300 animate-pulse hidden md:block mt-8"
          style={{width: "90%", height: "48px"}}
        ></div>
        <div
          className="bg-base-300 animate-pulse mt-8 hidden md:block"
          style={{width: "30%", height: "48px"}}
        ></div>
        <div
          className="bg-base-300 animate-pulse md:hidden"
          style={{width: "100%", height: "24px"}}
        ></div>
        <div
          className="bg-base-300 animate-pulse mt-4 md:hidden mx-auto"
          style={{width: "60%", height: "24px"}}
        ></div>
      </div>
    </div>
  );
};

export {DreamCareerLoading};
