const Content = () => {
  return (
    <div className="w-full">
      <div className="w-full flex flex-col md:flex-row gap-2 my-2 last:-mb-4 md:last:mb-4">
        <div
          className="bg-base-300 rounded-md animate-pulse"
          style={{width: "100%", height: "48px"}}
        ></div>
        <div
          className="bg-base-300 rounded-md animate-pulse"
          style={{width: "100%", height: "48px"}}
        ></div>
        <div
          className="place-self-end mb-8 md:mb-0 bg-base-300 rounded-md animate-pulse"
          style={{width: "48px", minWidth: "48px", height: "48px"}}
        ></div>
      </div>
      <div
        className="bg-base-300 rounded-md animate-pulse mt-2 mb-8"
        style={{width: "155px", height: "48px"}}
      ></div>
    </div>
  );
};

const Experience = () => {
  return (
    <div className="w-full px-4">
      <div
        className="bg-base-300 animate-pulse mt-8 mb-4"
        style={{width: "175px", height: "28px"}}
      ></div>
      <div
        className="bg-base-300 animate-pulse"
        style={{width: "200px", height: "28px"}}
      ></div>
      <Content />
      <div
        className="bg-base-300 animate-pulse"
        style={{width: "200px", height: "28px"}}
      ></div>
      <Content />
    </div>
  );
};

export {Experience};
