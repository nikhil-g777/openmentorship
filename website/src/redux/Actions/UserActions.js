import {
  USER_LOGIN_START,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  USER_REGISTER_START,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_ERROR,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
} from "../Types/UserTypes";

import axiosClient from "../../helper";

export const loginUser = (data) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_START });
  try {
    if (
      process.env.REACT_APP_IS_LOCAL &&
      process.env.REACT_APP_IS_LOCAL == "true"
    ) {
      data.isLocal = true;
    }

    const result = await axiosClient().post(`/users/login`, data);
    localStorage.setItem("token", JSON.stringify(result.data.token));
    dispatch(getUserInfo());
    return dispatch({ type: USER_LOGIN_SUCCESS, payload: result });
  } catch (err) {
    console.log("error loggingin: ", err);
    return dispatch({ type: USER_LOGIN_ERROR });
  }
};

export const registerUser = (data) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_START });
  try {
    if (
      process.env.REACT_APP_IS_LOCAL &&
      process.env.REACT_APP_IS_LOCAL == "true"
    ) {
      data.isLocal = true;
    }

    const result = await axiosClient().post(`/users/register`, data);
    localStorage.setItem("token", JSON.stringify(result.data.token));
    return dispatch({ type: USER_REGISTER_SUCCESS, payload: result });
  } catch (err) {
    return dispatch({ type: USER_REGISTER_ERROR });
  }
};

export const getUserInfo = () => async (dispatch) => {
  dispatch({ type: GET_USER_INFO });
  try {
    const result = await axiosClient().get(`/users/info`);
    console.log("get user: ", result);
    return dispatch({ type: GET_USER_INFO_SUCCESS, payload: result });
  } catch (err) {
    console.log("error in get user: ", err);
    return dispatch({ type: GET_USER_INFO_ERROR });
  }
};

export const updateUser = (payload) => async (dispatch) => {
  console.log("payload in update User: ", payload);
  dispatch({ type: UPDATE_USER_START });
  try {
    const result = await axiosClient().put(`/users/update`, payload);
    console.log("get user: ", result);
    return dispatch({ type: UPDATE_USER_SUCCESS, payload: result });
  } catch (err) {
    console.log("error in update user: ", err);
    return dispatch({ type: UPDATE_USER_ERROR });
  }
};
export const userChatToken = () => async () => {
  try {
    const result = await axiosClient().get(`/users/chatToken?`);
    return result;
  } catch (err) {
    console.log("error in update user: ", err);
  }
};
