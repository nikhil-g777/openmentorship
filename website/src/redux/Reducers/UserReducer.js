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

const initialState = {
  user: {},
  loading: true,
  userError: false,
  isUserUpdated: false,
};

export default function reducer(state = initialState, action) {
  ///////////////////////////////////////////////////////

  switch (action.type) {
    case USER_LOGIN_START:
      return {
        ...state,
        loading: true,
        userError: false,
      };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.data,
        userError: false,
      };

    case USER_LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        userError: true,
      };

    case USER_REGISTER_START:
      return {
        ...state,
        loading: true,
        userError: false,
      };

    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.data,
        userError: false,
      };

    case USER_REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        userError: true,
      };

    case GET_USER_INFO:
      return {
        ...state,
        loading: true,
      };

    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.data,
      };

    case GET_USER_INFO_ERROR:
      return {
        ...state,
        loading: false,
      };

    case UPDATE_USER_START:
      return {
        ...state,
        loading: true,
        userError: false,
        isUserUpdated: false,
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.data,
        userError: false,
        isUserUpdated: true,
      };

    case UPDATE_USER_ERROR:
      return {
        ...state,
        loading: false,
        userError: true,
        isUserUpdated: false,
      };

    default:
      return state;
  }
}
