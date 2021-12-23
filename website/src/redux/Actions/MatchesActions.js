import {
  GET_USER_MATCHES,
  GET_USER_MATCHES_SUCCESS,
  GET_USER_MATCHES_ERROR,
} from "../Types/UserTypes";

import axiosClient from "../../helper";

export const getUserMatches = (payload) => async (dispatch) => {
  dispatch({ type: GET_USER_MATCHES });
  try {
    const result = await axiosClient().get(`/matches/list/${payload._id}`);
    console.log("get matches: ", result);
    return dispatch({ type: GET_USER_MATCHES_SUCCESS, payload: result });
  } catch (err) {
    console.log("error in get matches: ", err);
    return dispatch({ type: GET_USER_MATCHES_ERROR });
  }
};
