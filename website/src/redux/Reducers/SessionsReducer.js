import {
  GET_SESSIONS,
  GET_SESSIONS_SUCCESS,
  GET_SESSIONS_ERROR,
} from "../Types/UserTypes";

const initialState = {
  sessions: [],
  loading: true,
  sessionsError: false,
};

export default function reducer(state = initialState, action) {
  ///////////////////////////////////////////////////////

  switch (action.type) {
    case GET_SESSIONS:
      return {
        ...state,
        loading: true,
      };

    case GET_SESSIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        sessions: action.payload.data,
      };

    case GET_SESSIONS_ERROR:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
