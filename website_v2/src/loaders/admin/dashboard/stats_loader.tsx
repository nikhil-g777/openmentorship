const StatsLoader = () => {
  return (
    <div className="w-full">
      {/* Stats Header */}
      <div
        className="animate-pulse mb-4"
        style={{width: "128px", height: "24px"}}
      ></div>
      {/* Stats Container */}
      <div className="w-full flex flex-col lg:flex-row mb-16">
        <div
          className="animate-pulse border border-base-300 rounded-box"
          style={{width: "100%", height: "162px"}}
        ></div>
        <div className="divider lg:divider-horizontal"></div>
        <div
          className="animate-pulse border border-base-300 rounded-box"
          style={{width: "100%", height: "162px"}}
        ></div>
        <div className="divider lg:divider-horizontal"></div>
        <div
          className="animate-pulse border border-base-300 rounded-box"
          style={{width: "100%", height: "162px"}}
        ></div>
      </div>
      {/* Graph Container */}
      <div className="w-full flex flex-col justify-center">
        <div
          className="w-full animate-pulse mb-4"
          style={{width: "128px", height: "24px"}}
        ></div>
        <div
          className="btn btn-sm btn-outline border-base-300 animate-pulse mb-2 self-end"
          style={{width: "128px", height: "32px"}}
        ></div>
        <div
          className="w-full animate-pulse border-base-300"
          style={{width: "100%", height: "320px"}}
        ></div>
      </div>
    </div>
  );
};

export {StatsLoader};
