const Loading = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-20">
      <div className="card lg:card-side bg-base-100 border border-base-300 max-w-3xl min-h-[400px] mx-auto p-8">
        <div
          className="bg-base-300 animate-pulse"
          style={{width: "300px", height: "300px"}}
        ></div>
        <div className="card-body justify-center">
          <div
            className="bg-base-300 animate-pulse mx-auto"
            style={{width: "80px", height: "30px"}}
          ></div>
          <div
            className="bg-base-300 animate-pulse mx-auto"
            style={{width: "200px", height: "14px"}}
          ></div>
          <div
            className="bg-base-300 animate-pulse mx-auto"
            style={{width: "180px", height: "14px"}}
          ></div>
          <div className="card-actions justify-center mt-4">
            <div
              className="bg-base-300 animate-pulse rounded-md"
              style={{width: "180px", height: "36px"}}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
