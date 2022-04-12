import {
  GET_EXPLORE_DATA,
  GET_EXPLORE_DATA_SUCCESS,
  GET_EXPLORE_DATA_ERROR,
  GET_EXPLORE_DATA_BY_CONTENT,
  GET_EXPLORE_DATA_BY_CONTENT_SUCCESS,
  GET_EXPLORE_DATA_BY_CONTENT_ERROR,
} from "../Types/UserTypes";

const initialState = {
  Explore: [],
  loading: true,
  matchesError: false,
};

export default function Explorereducer(state = initialState, action) {
  ///////////////////////////////////////////////////////

  switch (action.type) {
    case GET_EXPLORE_DATA_BY_CONTENT:
      return {
        ...state,
        loading: true,
      };

    case GET_EXPLORE_DATA_BY_CONTENT_SUCCESS:
      console.log("reducer result", action.payload.data);
      return {
        ...state,
        loading: false,
        Explore: action.payload.data.mentors,
      };

    case GET_EXPLORE_DATA_BY_CONTENT_ERROR:
      return {
        ...state,
        loading: false,
      };
    case GET_EXPLORE_DATA:
      return {
        ...state,
        loading: true,
      };

    case GET_EXPLORE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        Explore: action.payload.data.recommendations,
      };

    case GET_EXPLORE_DATA_ERROR:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
