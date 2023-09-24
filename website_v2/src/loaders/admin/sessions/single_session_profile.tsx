const SingleSessionProfile = () => {
  return (
    <div className="w-full h-full items-stretch flex flex-col sm:flex-row gap-5 mt-8 lg:gap-10">
      <div
        className="bg-base-300 rounded-md mx-auto animate-pulse"
        style={{
          minWidth: "150px",
          width: "150px",
          minHeight: "150px",
          height: "150px",
        }}
      ></div>
      {/* Typography */}
      <div className="w-full flex flex-col">
        {/* Name */}
        <div className="w-full flex justify-center sm:justify-start items-center gap-4 mb-2">
          <div
            className="bg-base-300 animate-pulse"
            style={{width: "176px", height: "32px"}}
          ></div>
          <div
            className="bg-base-300 animate-pulse"
            style={{width: "24px", height: "24px"}}
          ></div>
        </div>
        {/* Designation */}
        <div
          className="bg-base-300 animate-pulse my-4"
          style={{width: "144px", height: "20px"}}
        ></div>
        {/* Session ID */}
        <div
          className="bg-base-300 animate-pulse"
          style={{width: "80%", height: "24px"}}
        ></div>
      </div>
    </div>
  );
};

export {SingleSessionProfile};
