const MessagesScreenLoader = () => {
  return (
    <div className="w-full hidden md:block">
      {/* Header */}
      <div className="w-full flex flex-row items-center p-4 gap-4 border-b border-base-300">
        <div
          className="rounded-full bg-base-300 animate-pulse"
          style={{width: "36px", height: "36px"}}
        ></div>
        <div
          className="bg-base-300 animate-pulse"
          style={{width: "64px", height: "20px"}}
        ></div>
      </div>
    </div>
  );
};

export {MessagesScreenLoader};
