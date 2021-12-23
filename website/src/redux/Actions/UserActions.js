import axiosClient from "../../helper";
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
} from "../Types/UserTypes";

export const loginUser = (data) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_START });
  try {
    console.log("before request...");
    const result = await axiosClient().post(`/users/login`, data);
    localStorage.setItem("token", JSON.stringify(result.data.token));
    return dispatch({ type: USER_LOGIN_SUCCESS, payload: result });
  } catch (err) {
    return dispatch({ type: USER_LOGIN_ERROR });
  }
};

export const registerUser = (data) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_START });
  try {
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
