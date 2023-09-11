const Content = () => {
  return (
    <div className="w-full flex items-center gap-4 mt-2">
      <div
        className="bg-base-300 rounded-md animate-pulse"
        style={{width: "24px", height: "24px"}}
      ></div>
      <div
        className="bg-base-300 animate-pulse rounded-md mt-2"
        style={{width: "150px", height: "20px"}}
      ></div>
    </div>
  );
};

const MoreAboutYou = () => {
  return (
    <div className="w-full px-4">
      {/* Account Type */}
      <div
        className="bg-base-300 animate-pulse mt-8 mb-4"
        style={{width: "175px", height: "28px"}}
      ></div>
      <div
        className="bg-base-300 animate-pulse"
        style={{width: "200px", height: "28px"}}
      ></div>
      <div
        className="btn-group bg-base-300 animate-pulse mt-2"
        style={{width: "185px", height: "48px"}}
      ></div>
      {/* Profession */}
      <div className="w-full mt-8">
        <div
          className="bg-base-300 animate-pulse"
          style={{width: "200px", height: "28px"}}
        ></div>
        <div
          className="bg-base-300 animate-pulse rounded-md mt-2"
          style={{width: "100%", height: "48px"}}
        ></div>
      </div>
      {/* Area of Interest */}
      <div className="w-full mt-8">
        <div
          className="bg-base-300 animate-pulse"
          style={{width: "180px", height: "28px"}}
        ></div>
        <Content />
        <Content />
        <Content />
      </div>
    </div>
  );
};

export {MoreAboutYou};
