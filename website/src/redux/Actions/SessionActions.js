import {
  GET_SESSIONS,
  GET_SESSIONS_SUCCESS,
  GET_SESSIONS_ERROR,
} from "../Types/UserTypes";

import axiosClient from "../../helper";

export const getSessions = () => async (dispatch) => {
  dispatch({ type: GET_SESSIONS });
  try {
    const result = await axiosClient().get(`/sessions/sessionList`);
    console.log("get sessions: ", result);
    return dispatch({ type: GET_SESSIONS_SUCCESS, payload: result });
  } catch (err) {
    console.log("error in get sessions: ", err);
    return dispatch({ type: GET_SESSIONS_ERROR });
  }
};
