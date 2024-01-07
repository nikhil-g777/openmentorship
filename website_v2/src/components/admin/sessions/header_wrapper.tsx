"use client";

import {useRouter, useSearchParams} from "next/navigation";
import {Search} from "../common/search";

const HeaderWrapper = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchQuery = params.get("searchQuery") || "";

  // Handle reset search
  const handleReset = () => {
    router.push("/admin/sessions");
  };

  return (
    <div className="w-full flex justify-end gap-4">
      {/* Search */}
      <Search />
      {/* Reset Search*/}
      {searchQuery ? (
        <button className="btn btn-error btn-outline" onClick={handleReset}>
          Reset Search
        </button>
      ) : null}
    </div>
  );
};

export {HeaderWrapper};
