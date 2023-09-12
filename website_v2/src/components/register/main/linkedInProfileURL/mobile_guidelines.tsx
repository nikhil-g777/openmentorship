const MobileGuidelines = () => {
  return (
    <div className="w-full">
      <p className="truncate mb-2">To find your public profile URL:</p>
      {/* Step 1 */}
      <div className="flex items-center gap-2 mb-2">
        <button className="btn btn-primary btn-circle btn-xs">1</button>
        <p className="text-sm">Tap your profile photo.</p>
      </div>
      {/* Step 2 */}
      <div className="flex items-center gap-2 mb-2">
        <button className="btn btn-primary btn-circle btn-xs">2</button>
        <p className="text-sm">
          Scroll down to the <strong>Contact</strong> section.
        </p>
      </div>
      {/* Step 3 */}
      <div className="flex items-center gap-2 mb-2">
        <button className="btn btn-primary btn-circle btn-xs">3</button>
        <p className="text-sm">
          Under <strong>LinkedIn</strong>, locate your public profile URL.
        </p>
      </div>
      {/* Step 4 */}
      <div className="flex items-center gap-2 mb-2">
        <button className="btn btn-primary btn-circle btn-xs">4</button>
        <p className="text-sm">
          Copy and paste this link in <strong>LinkedIn Profile URL</strong>{" "}
          field.
        </p>
      </div>
    </div>
  );
};

export {MobileGuidelines};
