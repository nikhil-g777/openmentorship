import {AnalyticsHeader} from "./analytics_header";
import {ChartHeader} from "./chart_header";
import {ChartWrapper} from "./chart_wrapper";
import {StatsContainer} from "./stats_container";

const Analytics = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16">
      <AnalyticsHeader />
      <StatsContainer />
      <ChartHeader />
      <ChartWrapper />
    </div>
  );
};

export {Analytics};
