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

const initialState = {
  matches: {},
  newMatch: {},
  updatedMatch: {},
  loading: true,
  matchesError: false,
};

export default function reducer(state = initialState, action) {
  ///////////////////////////////////////////////////////

  switch (action.type) {
    case GET_USER_MATCHES:
      return {
        ...state,
        loading: true,
      };

    case GET_USER_MATCHES_SUCCESS:
      return {
        ...state,
        loading: false,
        matches: action.payload.data.matches,

      };

    case GET_USER_MATCHES_ERROR:
      return {
        ...state,
        loading: false,
      };

    case CREATE_MATCHES:
      return {
        ...state,
        loading: true,
        matchError: false,
      };

    case CREATE_MATCHES_SUCCESS:
      return {
        ...state,
        loading: false,
        newMatch: action.payload.data,
        matchError: false,
      };

    case CREATE_MATCHES_ERROR:
      return {
        ...state,
        loading: false,
        matchError: true,
      };

    case UPDATE_MATCHES:
      return {
        ...state,
        loading: true,
        matchError: false,
      };

    case UPDATE_MATCHES_SUCCESS:
      return {
        ...state,
        loading: false,
        updatedMatch: action.payload.data,
        matchError: false,
      };

    case UPDATE_MATCHES_ERROR:
      return {
        ...state,
        loading: false,
        matchError: true,
      };

    default:
      return state;
  }
}
