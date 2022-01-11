import { combineReducers } from "redux";
import userreducer from "./UserReducer";
import matchesreducer from "./MatchesReducer";
import sessionsreducer from "./SessionsReducer";

export default combineReducers({
  userreducer,
  matchesreducer,
  sessionsreducer,
});
