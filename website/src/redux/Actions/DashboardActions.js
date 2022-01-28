import {
  GET_STATISTICS,
  GET_STATISTICS_SUCCESS,
  GET_STATISTICS_ERROR,
  GET_USERS_LIST,
  GET_USERS_LIST_SUCCESS,
  GET_USERS_LIST_ERROR,
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_ERROR,
  GET_ADMIN_SESSIONS,
  GET_ADMIN_SESSIONS_SUCCESS,
  GET_ADMIN_SESSIONS_ERROR,
  UPDATE_MENTOR_REGISTERATION,
  UPDATE_MENTOR_REGISTERATION_SUCCESS,
  UPDATE_MENTOR_REGISTERATION_ERROR,
} from "../Types/UserTypes";

import axiosClient from "../../helper";

export const getDashboardStats = () => async (dispatch) => {
  dispatch({ type: GET_STATISTICS });
  try {
    const result = await axiosClient().get(`/admin/statistics`);
    console.log("result: ", result);
    return dispatch({ type: GET_STATISTICS_SUCCESS, payload: result });
  } catch (err) {
    return dispatch({ type: GET_STATISTICS_ERROR });
  }
};

export const getUsersList = () => async (dispatch) => {
  dispatch({ type: GET_USERS_LIST });
  try {
    const result = await axiosClient().get(`/admin/userList?page=1&limit=20`);
    console.log("result: ", result);
    return dispatch({ type: GET_USERS_LIST_SUCCESS, payload: result });
  } catch (err) {
    return dispatch({ type: GET_USERS_LIST_ERROR });
  }
};

export const getUserProfile = (userId) => async (dispatch) => {
  dispatch({ type: GET_USER_PROFILE });
  try {
    const result = await axiosClient().get(
      `/admin/userProfile?userId=${userId}`
    );
    console.log("result: ", result);
    return dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: result });
  } catch (err) {
    return dispatch({ type: GET_USER_PROFILE_ERROR });
  }
};

export const getSessionsList = () => async (dispatch) => {
  dispatch({ type: GET_ADMIN_SESSIONS });
  try {
    const result = await axiosClient().get(`/admin/sessionList`);
    console.log("result: ", result);
    return dispatch({ type: GET_ADMIN_SESSIONS_SUCCESS, payload: result });
  } catch (err) {
    return dispatch({ type: GET_ADMIN_SESSIONS_ERROR });
  }
};

export const updateMentorRegisteration = (data) => async (dispatch) => {
  dispatch({ type: UPDATE_MENTOR_REGISTERATION });
  try {
    const result = await axiosClient().post(
      `/admin/updateMentorRegistration`,
      data
    );
    localStorage.setItem("token", JSON.stringify(result.data.token));
    return dispatch({
      type: UPDATE_MENTOR_REGISTERATION_SUCCESS,
      payload: result,
    });
  } catch (err) {
    console.log("error loggingin: ", err);
    return dispatch({ type: UPDATE_MENTOR_REGISTERATION_ERROR });
  }
};
