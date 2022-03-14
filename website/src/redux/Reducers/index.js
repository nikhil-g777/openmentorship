import { combineReducers } from "redux";
import dashboardreducer from "./DashboardReducer";
import matchesreducer from "./MatchesReducer";
import mentorapplicationsreducer from "./MentorApplicationsReducer";
import sessionsreducer from "./SessionsReducer";
import userreducer from "./UserReducer";
import Explorereducer from "./ExploreReducer";

export default combineReducers({
  dashboardreducer,
  matchesreducer,
  mentorapplicationsreducer,
  sessionsreducer,
  userreducer,
  Explorereducer,
});
