import {DashboardTypes, ExploreTypes} from "@/types/pagination";

// Handle previous for explore page
const handleExplorePrev = ({
  pathname,
  currentPage,
  limit,
  areasOfInterest,
  goals,
  communicationFrequency,
  communicationPreferences,
  router,
  startTransition,
}: ExploreTypes) => {
  const url = `${pathname}?page=${
    currentPage - 1
  }&limit=${limit}&areasOfInterest=${areasOfInterest}&goals=${goals}&communicationFrequency=${communicationFrequency}&communicationPreferences=${communicationPreferences}`;
  startTransition(() => {
    router.push(url);
    router.refresh();
  });
};

// Handle next for explore page
const handleExploreNext = ({
  pathname,
  currentPage,
  limit,
  areasOfInterest,
  goals,
  communicationFrequency,
  communicationPreferences,
  router,
  startTransition,
}: ExploreTypes) => {
  const url = `${pathname}?page=${
    currentPage + 1
  }&limit=${limit}&areasOfInterest=${areasOfInterest}&goals=${goals}&communicationFrequency=${communicationFrequency}&communicationPreferences=${communicationPreferences}`;
  startTransition(() => {
    router.push(url);
    router.refresh();
  });
};

// Handle previous for dashboard page
const handleDashboardPrev = ({
  pathname,
  currentPage,
  userType,
  router,
  startTransition,
}: DashboardTypes) => {
  const uri = `${pathname}?tab=users&userType=${userType}&page=${
    currentPage - 1
  }`;
  startTransition(() => {
    router.push(uri);
    router.refresh();
  });
};

// Handle next for dashboard page
const handleDashboardNext = ({
  pathname,
  currentPage,
  userType,
  router,
  startTransition,
}: DashboardTypes) => {
  const uri = `${pathname}?tab=users&userType=${userType}&page=${
    currentPage + 1
  }`;
  startTransition(() => {
    router.push(uri);
    router.refresh();
  });
};

export {
  handleExplorePrev,
  handleExploreNext,
  handleDashboardPrev,
  handleDashboardNext,
};
