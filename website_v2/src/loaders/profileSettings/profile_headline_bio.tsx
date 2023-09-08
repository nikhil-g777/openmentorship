const Content = () => {
  return (
    <div className="w-full py-2">
      <div
        className="bg-base-300 animate-pulse mb-2"
        style={{width: "60px", height: "20px"}}
      ></div>
      <div
        className="bg-base-300 animate-pulse"
        style={{width: "100%", height: "48px"}}
      ></div>
    </div>
  );
};

const ProfileHeadlineBio = () => {
  return (
    <div className="w-full flex flex-col items-center sm:flex-row sm:items-start gap-5 mt-8">
      <div
        className="min-w-[150px] min-h-[150px] bg-base-300 rounded-md animate-pulse"
        style={{width: "150px", height: "150px"}}
      ></div>
      <div className="w-full flex flex-col gap-4">
        <div
          className="bg-base-300 animate-pulse"
          style={{width: "150px", height: "32px"}}
        ></div>
        <Content />
        <Content />
      </div>
    </div>
  );
};

export {ProfileHeadlineBio};
