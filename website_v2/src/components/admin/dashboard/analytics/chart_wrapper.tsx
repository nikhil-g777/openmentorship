"use client";

import {ChartMain} from "./chart_main";

const ChartWrapper = () => {
  return (
    <div className="w-full">
      {/* Date container */}
      <div className="w-full flex items-center justify-end mb-2">
        <input
          type="date"
          className="w-1/6 btn btn-sm btn-outline border-base-300 hover:btn-accent"
        />
      </div>
      <ChartMain />
    </div>
  );
};

export {ChartWrapper};
