import {
  UPDATE_MENTOR_REGISTERATION,
  UPDATE_MENTOR_REGISTERATION_SUCCESS,
  UPDATE_MENTOR_REGISTERATION_ERROR,
  GET_MENTOR_APPLICATIONS,
  GET_MENTOR_APPLICATIONS_SUCCESS,
  GET_MENTOR_APPLICATIONS_ERROR,
} from "../Types/UserTypes";

const initialState = {
  mentor: {},
  mentorApplications: [],
  loading: false,
  error: "",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_MENTOR_APPLICATIONS:
      return {
        ...state,
        loading: true,
      };

    case GET_MENTOR_APPLICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        mentorApplications: action.payload.data,
      };

    case GET_MENTOR_APPLICATIONS_ERROR:
      return {
        ...state,
        loading: false,
        mentorApplications: [],
        error: action.payload,
      };

    case UPDATE_MENTOR_REGISTERATION:
      return {
        ...state,
        loading: true,
        mentorError: "",
      };

    case UPDATE_MENTOR_REGISTERATION_SUCCESS:
      return {
        ...state,
        loading: false,
        mentor: action.payload.data,
        error: "",
      };

    case UPDATE_MENTOR_REGISTERATION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
