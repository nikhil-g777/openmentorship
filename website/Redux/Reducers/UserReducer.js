import {
  USER_LOGIN_START,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR
} from '../Types/UserTypes';

const initialState = {
  user: {},
  loading: true
};

export default function reducer(state = initialState, action) {
  ///////////////////////////////////////////////////////

  switch (action.type) {
    case USER_LOGIN_START:
      return {
        ...state,
        loading: true
      };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload
      };

    case USER_LOGIN_ERROR:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
}
