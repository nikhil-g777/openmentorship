const Content = () => {
  return (
    <div className="collapse border border-base-300 bg-base-100 rounded-box py-4">
      <div
        className="collapse-title text-black peer-checked:text-black text-lg sm:text-xl font-semibold"
        style={{width: "180px", height: "24px"}}
      >
        <div
          className="bg-base-300 animate-pulse"
          style={{width: "180px", height: "24px"}}
        ></div>
      </div>
    </div>
  );
};

const FAQLoader = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 my-20">
      <div
        className="bg-base-300 animate-pulse mx-auto hidden sm:block"
        style={{width: "340px", height: "55px"}}
      ></div>
      <div
        className="bg-base-300 animate-pulse mx-auto hidden sm:block mb-8 mt-4"
        style={{width: "400px", height: "24px"}}
      ></div>
      <div
        className="bg-base-300 animate-pulse mx-auto sm:hidden"
        style={{width: "80%", height: "24px"}}
      ></div>
      <div
        className="bg-base-300 animate-pulse mx-auto sm:hidden mb-8 mt-4"
        style={{width: "100%", height: "16px"}}
      ></div>
      {/* List */}
      <Content />
      <Content />
      <Content />
      <Content />
      <Content />
      {/* See More */}
      <div
        className="bg-base-300 animate-pulse mt-4 mx-auto"
        style={{width: "90px", height: "28px"}}
      ></div>
    </div>
  );
};

export {FAQLoader};
