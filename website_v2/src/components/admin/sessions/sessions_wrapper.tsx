import {HeaderWrapper} from "./header_wrapper";
import {SessionsListing} from "./sessions_listing";

const SessionsWrapper = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16">
      {/* Header */}
      <HeaderWrapper />
      {/* Listing */}
      <SessionsListing />
    </div>
  );
};

export {SessionsWrapper};
