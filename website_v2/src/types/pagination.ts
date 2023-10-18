import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {TransitionStartFunction} from "react";

// Explore Types
type ExploreTypes = {
  pathname: string;
  currentPage: number;
  limit: string;
  areasOfInterest: string;
  goals: string;
  communicationFrequency: string;
  communicationPreferences: string;
  router: AppRouterInstance;
  startTransition: TransitionStartFunction;
};

// Dashboard Types
type DashboardTypes = {
  pathname: string;
  currentPage: number;
  userType: string;
  router: AppRouterInstance;
  startTransition: TransitionStartFunction;
};

// Sessions Types
type SessionsTypes = {
  pathname: string;
  currentPage: number;
  currentTab: string;
  searchString: string;
  router: AppRouterInstance;
  startTransition: TransitionStartFunction;
};

export type {ExploreTypes, DashboardTypes, SessionsTypes};
