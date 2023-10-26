const BlogCard = () => {
  return (
    <div className="card sm:card-side bg-base-100 border border-base-300">
      <div className="w-full min-w-[200px] sm:min-w-[300px] sm:max-w-xs aspect-video bg-base-300 animate-pulse"></div>
      <div className="card-body p-4 lg:px-8">
        <div
          className="bg-base-300 animate-pulse"
          style={{height: "28px", width: "40%"}}
        ></div>
        <div
          className="bg-base-300 animate-pulse"
          style={{height: "20px", width: "90%"}}
        ></div>
        <div
          className="bg-base-300 animate-pulse"
          style={{height: "20px", width: "80%"}}
        ></div>
        <div
          className="bg-base-300 animate-pulse"
          style={{height: "20px", width: "85%"}}
        ></div>
        <div
          className="bg-base-300 animate-pulse"
          style={{height: "24px", width: "35%"}}
        ></div>
        <div className="card-actions justify-end">
          <div
            className="bg-base-300 animate-pulse btn btn-link"
            style={{width: "100px", height: "20px"}}
          ></div>
        </div>
      </div>
    </div>
  );
};

const Loading = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-20">
      {/* Heading */}
      <div className="w-full flex items-center justify-center md:justify-start mt-16">
        <div className="w-36 sm:w-96 h-8 sm:h-16 bg-base-300 animate-pulse"></div>
      </div>
      {/* Cards */}
      <div className="flex flex-col gap-8 mt-8">
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </div>
  );
};

export default Loading;
