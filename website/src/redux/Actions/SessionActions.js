import {
  GET_SESSIONS,
  GET_SESSIONS_SUCCESS,
  GET_SESSIONS_ERROR,
  UPDATE_SESSION,
  UPDATE_SESSION_SUCCESS,
  UPDATE_SESSION_ERROR,

} from "../Types/UserTypes";

import axiosClient from "../../helper";

export const getSessions = () => async (dispatch) => {
  dispatch({ type: GET_SESSIONS });
  try {
    const result = await axiosClient().get(`/sessions/sessionList`);
    console.log("get sessions: ", result);
    return dispatch({ type: GET_SESSIONS_SUCCESS, payload: result.data });
  } catch (err) {
    console.log("error in get sessions: ", err);
    return dispatch({ type: GET_SESSIONS_ERROR });
  }
};

export const endChatSession = (data) => async (dispatch) => {
  dispatch({ type: UPDATE_SESSION });
  try {
    const result = await axiosClient().post(`/matches/update`,data);
    console.log("get sessions: ", result);
    return dispatch({ type: UPDATE_SESSION_SUCCESS, payload: result.data });
  } catch (err) {
    console.log("error in get sessions: ", err);
    return dispatch({ type: UPDATE_SESSION_ERROR });
  }
};
