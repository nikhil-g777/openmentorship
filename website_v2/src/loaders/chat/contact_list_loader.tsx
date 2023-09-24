// Single Contact
const Contact = () => {
  return (
    <div className="w-full flex flex-row items-center gap-4 p-4 border-b border-base-300">
      <div
        className="rounded-full bg-base-300 animate-pulse"
        style={{width: "36px", height: "36px"}}
      ></div>
      <div
        className="bg-base-300 animate-pulse"
        style={{width: "96px", height: "20px"}}
      ></div>
    </div>
  );
};

// Contact List Loader
const ContactListLoader = () => {
  return (
    <div className="w-full h-full md:max-w-xs border-r border-base-300">
      {/* Header */}
      <div className="w-full p-4 border-b border-base-300">
        <div
          className="bg-base-300 animate-pulse"
          style={{width: "64px", height: "36px"}}
        ></div>
      </div>
      {/* Contacts */}
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
      <Contact />
    </div>
  );
};

export {ContactListLoader};
