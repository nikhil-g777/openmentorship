import {
  GET_EXPLORE_DATA,
  GET_EXPLORE_DATA_SUCCESS,
  GET_EXPLORE_DATA_ERROR,
  GET_EXPLORE_DATA_BY_CONTENT,
  GET_EXPLORE_DATA_BY_CONTENT_SUCCESS,
  GET_EXPLORE_DATA_BY_CONTENT_ERROR,
} from "../Types/UserTypes";

import axiosClient from "../../helper";

export const getexploredataByContent =
  (page, limit, findMentor) => async (dispatch) => {
    dispatch({ type: GET_EXPLORE_DATA_BY_CONTENT });
    try {
      const data = await axiosClient().get(
        `/matches/searchMentors?page=${page}&limit=${limit}&areasOfInterest=${findMentor.areaOfInterest}&goals=${findMentor.goals}&communicationFrequency=${findMentor.communicationFrequency}&communicationPreferences=${findMentor.communicationPreferences}`
      );
      console.log("get explore data: ", data);
      return dispatch({
        type: GET_EXPLORE_DATA_BY_CONTENT_SUCCESS,
        payload: data,
      });
    } catch (err) {
      console.log("error in get explore: ", err);
      return dispatch({ type: GET_EXPLORE_DATA_BY_CONTENT_ERROR });
    }
  };

export const getexploredata = () => async (dispatch) => {
  dispatch({ type: GET_EXPLORE_DATA });
  try {
    const data = await axiosClient().get("/matches/userRecommendations");
    console.log("get explore data: ", data);
    return dispatch({ type: GET_EXPLORE_DATA_SUCCESS, payload: data });
  } catch (err) {
    console.log("error in get explore: ", err);
    return dispatch({ type: GET_EXPLORE_DATA_ERROR });
  }
};
