import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  POST_USER_REQUEST,
  POST_USER_SUCCESS,
  POST_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  DELETE_USER,
} from "../actions/CurrentUser";

const initialState = {
  isLoading: false,
  error: null,
  currentUser: {
    name: "",
    email: "",
  },
  isLoggedIn: false,
  refreshToken: "",
};

const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST: {
      return { ...state, isLoading: true };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        currentUser: action.payload.user,
        isLoading: false,
        isLoggedIn: true,
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        isLoading: false,
        currentUser: { name: "", email: "" },
        isLoggedIn: false,
      };
    }
    case DELETE_USER: {
      return {
        ...state,
        currentUser: { name: "", email: "" },
        isLoggedIn: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default currentUserReducer;
