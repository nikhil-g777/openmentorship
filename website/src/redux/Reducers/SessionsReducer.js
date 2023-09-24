import {
  GET_SESSIONS,
  GET_SESSIONS_SUCCESS,
  GET_SESSIONS_ERROR,
  UPDATE_SESSION,
  UPDATE_SESSION_SUCCESS,
  UPDATE_SESSION_ERROR,
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
        sessions: action.payload.sessions,
      };

    case GET_SESSIONS_ERROR:
      return {
        ...state,
        loading: false,
      };

      case UPDATE_SESSION:
        return {
          ...state,
          loading: true,
        };
  
      case UPDATE_SESSION_SUCCESS:
        return {
          ...state,
          loading: false,
          // sessions: action.payload.sessions,
        };
  
      case UPDATE_SESSION_ERROR:
        return {
          ...state,
          loading: false,
        };

    default:
      return state;
  }
}
