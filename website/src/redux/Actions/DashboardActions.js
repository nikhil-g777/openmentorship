import {
  GET_STATISTICS,
  GET_STATISTICS_SUCCESS,
  GET_STATISTICS_ERROR,
  GET_MENTORS_LIST,
  GET_MENTORS_LIST_SUCCESS,
  GET_MENTORS_LIST_ERROR,
  GET_MENTEES_LIST,
  GET_MENTEES_LIST_SUCCESS,
  GET_MENTEES_LIST_ERROR,
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_ERROR,
  GET_ADMIN_SESSIONS,
  GET_ADMIN_SESSIONS_SUCCESS,
  GET_ADMIN_SESSIONS_ERROR,
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

export const getMentorsList = (pageNumber) => async (dispatch) => {
  dispatch({ type: GET_MENTORS_LIST });
  try {
    const result = await axiosClient().get(
      `/admin/userList?page=${pageNumber}&limit=20&userType=mentor`
    );
    console.log("result: ", result);
    return dispatch({ type: GET_MENTORS_LIST_SUCCESS, payload: result });
  } catch (err) {
    return dispatch({ type: GET_MENTORS_LIST_ERROR });
  }
};

export const getMenteesList = (pageNumber) => async (dispatch) => {
  dispatch({ type: GET_MENTEES_LIST });
  try {
    const result = await axiosClient().get(
      `/admin/userList?page=${pageNumber}&limit=20&userType=mentee`
    );

    console.log("result: ", result);
    return dispatch({ type: GET_MENTEES_LIST_SUCCESS, payload: result });
  } catch (err) {
    return dispatch({ type: GET_MENTEES_LIST_ERROR });
  }
};

export const getUserProfile = (userId) => async (dispatch) => {
  console.log("in get user profile");
  console.log("userId: ", userId);
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
