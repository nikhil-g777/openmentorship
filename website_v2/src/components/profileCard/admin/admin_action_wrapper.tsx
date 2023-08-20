"use client";

const AdminActionsWrapper = () => {
  return (
    <div className="w-full flex flex-col mt-4 gap-2">
      {/* Send Email */}
      <button className="w-full max-w-[200px] btn rounded-full btn-sm mt-4 mx-auto text-sm capitalize truncate btn-accent">
        Send Email
      </button>
      {/* Disable Account */}
      <button className="w-full max-w-[200px] btn rounded-full btn-sm mt-2 mx-auto text-sm capitalize truncate btn-outline btn-error">
        Disable Account
      </button>
    </div>
  );
};

export {AdminActionsWrapper};
