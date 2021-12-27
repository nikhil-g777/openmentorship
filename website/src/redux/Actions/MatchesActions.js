import {
  GET_USER_MATCHES,
  GET_USER_MATCHES_SUCCESS,
  GET_USER_MATCHES_ERROR,
  CREATE_MATCHES,
  CREATE_MATCHES_SUCCESS,
  CREATE_MATCHES_ERROR,
  UPDATE_MATCHES,
  UPDATE_MATCHES_SUCCESS,
  UPDATE_MATCHES_ERROR,
} from "../Types/UserTypes";

import axiosClient from "../../helper";

export const getUserMatches = () => async (dispatch) => {
  dispatch({ type: GET_USER_MATCHES });
  try {
    const result = await axiosClient().get(`/users/matches`);
    console.log("get matches: ", result);
    return dispatch({ type: GET_USER_MATCHES_SUCCESS, payload: result });
  } catch (err) {
    console.log("error in get matches: ", err);
    return dispatch({ type: GET_USER_MATCHES_ERROR });
  }
};

export const createMatch = (data) => async (dispatch) => {
  dispatch({ type: CREATE_MATCHES });
  try {
    const result = await axiosClient().post(`/matches/create`, data);
    return dispatch({ type: CREATE_MATCHES_SUCCESS, payload: result });
  } catch (err) {
    return dispatch({ type: CREATE_MATCHES_ERROR, payload: err });
  }
};

export const updateMatch = (payload) => async (dispatch) => {
  dispatch({ type: UPDATE_MATCHES });
  try {
    const result = await axiosClient().put(`/matches/update`, payload);
    return dispatch({ type: UPDATE_MATCHES_SUCCESS, payload: result });
  } catch (err) {
    return dispatch({ type: UPDATE_MATCHES_ERROR, payload: err });
  }
};
