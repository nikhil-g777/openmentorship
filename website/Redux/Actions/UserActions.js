import axiosClient from '../../../helper';
import {
  USER_LOGIN_START,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR
} from '../Types/UserTypes';

export const userLogin = (data) => async (dispatch) => {
  dispatch(userLoginStart());
  try {
    const result = await axiosClient().post(`/createCustomer `, data);

    return dispatch(userLoginSuccess(result));
  } catch (err) {
    return dispatch(userLoginError());
  }
};

// ALL GARAGES Actions
export const userLoginStart = () => ({
  type: USER_LOGIN_START
});
export const userLoginSuccess = (payload) => ({
  type: USER_LOGIN_SUCCESS,
  payload
});
export const userLoginError = () => ({
  type: USER_LOGIN_ERROR
});
