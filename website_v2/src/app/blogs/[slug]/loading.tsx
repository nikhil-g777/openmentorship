const Article = () => {
  return (
    <div className="w-full mt-4 flex flex-col gap-2">
      <div
        className="bg-base-300 animate-pulse"
        style={{width: "100%", height: "20px"}}
      ></div>
      <div
        className="bg-base-300 animate-pulse"
        style={{width: "90%", height: "20px"}}
      ></div>
      <div
        className="bg-base-300 animate-pulse"
        style={{width: "80%", height: "20px"}}
      ></div>
      <div
        className="bg-base-300 animate-pulse"
        style={{width: "100%", height: "20px"}}
      ></div>
      <div
        className="bg-base-300 animate-pulse"
        style={{width: "85%", height: "20px"}}
      ></div>
    </div>
  );
};

const Loading = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-20">
      {/* Back Button  */}
      <div className="w-20 h-6 mt-16 bg-base-300 animate-pulse"></div>
      {/* Heading */}
      <div className="w-full flex items-center mt-4">
        <div className="w-36 sm:w-96 h-8 sm:h-16 bg-base-300 animate-pulse"></div>
      </div>
      {/* Header image */}
      <div
        className="bg-base-300 animate-pulse mt-4 aspect-video"
        style={{width: "100%", maxHeight: "630px"}}
      ></div>
      {/* Author & Date */}
      <div className="flex flex-row gap-8 justify-between py-4">
        <div className="w-20 h-6 bg-base-300 animate-pulse"></div>
        <div className="w-20 h-6 bg-base-300 animate-pulse"></div>
      </div>
      {/* Article */}
      <Article />
      <br />
      <Article />
      <br />
      <Article />
    </div>
  );
};

export default Loading;
