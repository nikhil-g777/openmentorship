type StatsData = {
  success: boolean;
  menteeCount: number;
  mentorCount: number;
  matchCounts: {
    active: number;
    pending: number;
    closed: number;
  };
};

export type {StatsData};
