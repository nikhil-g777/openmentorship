import {
  GET_STATISTICS,
  GET_STATISTICS_SUCCESS,
  GET_STATISTICS_ERROR,
  GET_USERS_LIST,
  GET_USERS_LIST_SUCCESS,
  GET_USERS_LIST_ERROR,
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_ERROR,
  GET_ADMIN_SESSIONS,
  GET_ADMIN_SESSIONS_SUCCESS,
  GET_ADMIN_SESSIONS_ERROR,
  UPDATE_MENTOR_REGISTERATION,
  UPDATE_MENTOR_REGISTERATION_SUCCESS,
  UPDATE_MENTOR_REGISTERATION_ERROR,
} from "../Types/UserTypes";

const initialState = {
  stats: {},
  mentorsList: [],
  menteesList: [],
  user: {},
  activeSessions: [],
  closedSessions: [],
  mentor: {},
  loading: false,
  statsError: "",
  usersListError: "",
  userError: "",
  sessionsError: "",
  mentorError: "",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_STATISTICS:
      return {
        ...state,
        loading: true,
      };

    case GET_STATISTICS_SUCCESS:
      return {
        ...state,
        loading: false,
        statsError: "",
        stats: action.payload.data,
      };

    case GET_STATISTICS_ERROR:
      return {
        ...state,
        loading: false,
        stats: {},
        statsError: action.payload,
      };

    case GET_USERS_LIST:
      return {
        ...state,
        loading: true,
      };

    case GET_USERS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        usersListError: "",
        mentorsList: action.payload.data?.users?.filter((c) => {
          return c.userType === "mentor";
        }),
        menteesList: action.payload.data?.users?.filter((c) => {
          return c.userType === "mentee";
        }),
      };

    case GET_USERS_LIST_ERROR:
      return {
        ...state,
        loading: false,
        mentorsList: [],
        menteesList: [],
        usersListError: action.payload,
      };

    case GET_USER_PROFILE:
      return {
        ...state,
        loading: true,
      };

    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        userError: "",
        user: action.payload.data,
      };

    case GET_USER_PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        user: {},
        userError: action.payload,
      };

    case GET_ADMIN_SESSIONS:
      return {
        ...state,
        loading: true,
      };

    case GET_ADMIN_SESSIONS_SUCCESS:
      console.log("action.payload: ", action.payload.data);
      return {
        ...state,
        loading: false,
        sessionsError: "",
        activeSessions: action.payload.data?.sessions?.filter((c) => {
          return c.status === "active";
        }),
        closedSessions: action.payload.data?.sessions?.filter((c) => {
          return c.status === "closed";
        }),
      };

    case GET_ADMIN_SESSIONS_ERROR:
      return {
        ...state,
        loading: false,
        activeSessions: [],
        closedSessions: [],
        sessionsError: action.payload,
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
        mentorError: "",
      };

    case UPDATE_MENTOR_REGISTERATION_ERROR:
      return {
        ...state,
        loading: false,
        mentorError: "",
      };

    default:
      return state;
  }
}
