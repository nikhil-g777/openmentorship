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

const initialState = {
  user: {},
  loading: true,
};

export default function reducer(state = initialState, action) {
  ///////////////////////////////////////////////////////

  switch (action.type) {
    case USER_LOGIN_START:
      return {
        ...state,
        loading: true,
      };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.data,
      };

    case USER_LOGIN_ERROR:
      return {
        ...state,
        loading: false,
      };

    case USER_REGISTER_START:
      return {
        ...state,
        loading: true,
      };

    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.data,
      };

    case USER_REGISTER_ERROR:
      return {
        ...state,
        loading: false,
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

    default:
      return state;
  }
}
