import {
  GET_USER_MATCHES,
  GET_USER_MATCHES_SUCCESS,
  GET_USER_MATCHES_ERROR,
} from "../Types/UserTypes";

const initialState = {
  matches: [],
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
        matches: action.payload.data,
      };

    case GET_USER_MATCHES_ERROR:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
