import {
  UPDATE_MENTOR_REGISTERATION,
  UPDATE_MENTOR_REGISTERATION_SUCCESS,
  UPDATE_MENTOR_REGISTERATION_ERROR,
  GET_MENTOR_APPLICATIONS,
  GET_MENTOR_APPLICATIONS_SUCCESS,
  GET_MENTOR_APPLICATIONS_ERROR,
} from "../Types/UserTypes";

import axiosClient from "../../helper";

export const getMentorApplications = (pageNumber) => async (dispatch) => {
  dispatch({ type: GET_MENTOR_APPLICATIONS });
  try {
    const result = await axiosClient().get(
      `/admin/userList?page=${pageNumber}&limit=20&userType=mentor&registrationStatus=pendingApproval`
    );
    return dispatch({ type: GET_MENTOR_APPLICATIONS_SUCCESS, payload: result });
  } catch (err) {
    return dispatch({ type: GET_MENTOR_APPLICATIONS_ERROR });
  }
};

export const updateMentorRegisteration = (data) => async (dispatch) => {
  dispatch({ type: UPDATE_MENTOR_REGISTERATION });
  try {
    const result = await axiosClient().post(
      `/admin/updateMentorRegistration`,
      data
    );
    console.log("update status: ", result);
    return dispatch({
      type: UPDATE_MENTOR_REGISTERATION_SUCCESS,
      payload: result,
    });
  } catch (err) {
    console.log("error update status: ", err);
    return dispatch({ type: UPDATE_MENTOR_REGISTERATION_ERROR });
  }
};
