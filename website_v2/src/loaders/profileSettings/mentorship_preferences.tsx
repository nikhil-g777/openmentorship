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

const MentorshipPreferences = () => {
  return (
    <div className="w-full px-4">
      <div
        className="bg-base-300 animate-pulse mt-8 mb-4"
        style={{width: "175px", height: "28px"}}
      ></div>
      {/* Preference 1 */}
      <div
        className="bg-base-300 animate-pulse"
        style={{width: "100%", height: "28px"}}
      ></div>
      <Content />
      <Content />
      <Content />
      <Content />
      <Content />
      {/* Preference 2 */}
      <div
        className="bg-base-300 animate-pulse mt-8"
        style={{width: "100%", height: "28px"}}
      ></div>
      <Content />
      <Content />
      <Content />
      <Content />
      <Content />
      {/* Preference 3 */}
      <div
        className="bg-base-300 animate-pulse mt-8"
        style={{width: "100%", height: "28px"}}
      ></div>
      <Content />
      <Content />
      <Content />
      <Content />
      <Content />
    </div>
  );
};

export {MentorshipPreferences};
