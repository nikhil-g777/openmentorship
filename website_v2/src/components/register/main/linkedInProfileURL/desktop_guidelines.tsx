const DesktopGuidelines = () => {
  return (
    <div className="w-full">
      <p className="truncate mb-2">To find your public profile URL:</p>
      {/* Step 1 */}
      <div className="flex items-center gap-2 mb-2">
        <button className="btn btn-primary btn-circle btn-xs">1</button>
        <p className="text-sm">
          Click the <strong>Me</strong> icon at the top of your LinkedIn
          homepage.
        </p>
      </div>
      {/* Step 2 */}
      <div className="flex items-center gap-2 mb-2">
        <button className="btn btn-primary btn-circle btn-xs">2</button>
        <p className="text-sm">
          Click <strong>View Profile</strong>.
        </p>
      </div>
      {/* Step 3 */}
      <div className="flex items-center gap-2 mb-2">
        <button className="btn btn-primary btn-circle btn-xs">3</button>
        <p className="text-sm">
          On your profile page, click <strong>Edit public profile & URL</strong>{" "}
          on the right pane.
        </p>
      </div>
      {/* Step 4 */}
      <div className="flex items-center gap-2 mb-2">
        <button className="btn btn-primary btn-circle btn-xs">4</button>
        <p className="text-sm">
          Your public profile URL would be located under the{" "}
          <strong>Edit your custom URL</strong> section.
        </p>
      </div>
      {/* Step 5 */}
      <div className="flex items-center gap-2 mb-2">
        <button className="btn btn-primary btn-circle btn-xs">5</button>
        <p className="text-sm">
          Copy and paste this link in <strong>LinkedIn Profile URL</strong>{" "}
          field.
        </p>
      </div>
    </div>
  );
};

export {DesktopGuidelines};
