import { combineReducers } from "redux";
import userreducer from "./UserReducer";
import matchesreducer from "./MatchesReducer";

export default combineReducers({
  userreducer,
  matchesreducer,
});
