import {Listing} from "@/components/listing/listing_main";
import {HeaderWrapper} from "./header_wrapper";

const Users = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16">
      <HeaderWrapper />
      <Listing />
    </div>
  );
};

export {Users};
