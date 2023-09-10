const Content = () => {
  return (
    <div
      className="w-full bg-base-300 rounded-md animate-pulse"
      style={{width: "100%", height: "48px"}}
    ></div>
  );
};

const Loading = () => {
  return (
    <div className="w-full min-h-screen h-full grid grid-cols-1 md:grid-cols-2 justify-center">
      {/* Image */}
      <div
        className="w-full bg-base-300 animate-pulse hidden md:block"
        style={{width: "100%", height: "100vh"}}
      ></div>
      {/* Typography */}
      <div className="w-full flex flex-col gap-4 mt-8 px-4 sm:px-8 md:px-16">
        <div
          className="ml-auto mr-auto md:ml-0 bg-base-300 animate-pulse mb-4"
          style={{width: "60%", height: "48px"}}
        ></div>
        <div
          className="ml-auto mr-auto md:ml-0 bg-base-300 animate-pulse"
          style={{width: "80%", height: "24px"}}
        ></div>
        <div
          className="bg-base-300 rounded-md animate-pulse mb-2"
          style={{width: "180px", height: "36px"}}
        ></div>
        {/* Forms */}
        <div className="w-full mt-4">
          <div className="w-full flex flex-col md:flex-row gap-4 md:gap-2">
            <Content />
            <Content />
          </div>
          <div className="w-full flex flex-col gap-4 mt-4">
            <Content />
            <Content />
            <Content />
            <div
              className="w-full bg-base-300 rounded-md animate-pulse"
              style={{width: "100%", height: "82px"}}
            ></div>
          </div>
          {/* Login or Continue */}
          <div className="w-full mt-8 mb-16 flex flex-col-reverse md:flex-row justify-center items-center gap-4 md:gap-8">
            <div
              className="bg-base-300 animate-pulse"
              style={{width: "50%", height: "24px"}}
            ></div>
            <button className="w-48 btn btn-sm border-none bg-base-300 animate-pulse rounded-full"></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
