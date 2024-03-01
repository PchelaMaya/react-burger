import { TUserInfo } from "../../utils/types";
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  DELETE_USER,
  TCurrentUserActions,
  UPDATE_TOKEN,
} from "../actions/CurrentUser";

type TCurrentUserState = {
  isLoading: boolean;
  currentUser: TUserInfo;
  isLoggedIn: boolean;
  refreshToken: string | null;
  accessToken: string | null;
};

const initialState: TCurrentUserState = {
  isLoading: false,
  currentUser: {
    name: "",
    email: "",
  },
  isLoggedIn: false,
  refreshToken: null,
  accessToken: null,
};

const currentUserReducer = (
  state = initialState,
  action: TCurrentUserActions
) => {
  switch (action.type) {
    case GET_USER_REQUEST: {
      return { ...state, isLoading: true };
    }
    case GET_USER_SUCCESS: {
      const user = action.payload
        ? action.payload.user
        : { name: "", email: "" };

      return {
        ...state,
        currentUser: user,
        isLoading: false,
        isLoggedIn: true,
        refreshToken: action.payload.refreshToken,
        accessToken: action.payload.accessToken,
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        isLoading: false,
        currentUser: { name: "", email: "" },
        isLoggedIn: false,
        refreshToken: null,
        accessToken: null,
      };
    }
    case DELETE_USER: {
      return {
        ...state,
        currentUser: { name: "", email: "" },
        isLoggedIn: false,
        isLoading: false,
        refreshToken: null,
        accessToken: null,
      };
    }
    case UPDATE_TOKEN: {
      return {
        ...state,
        refreshToken: action.payload.refreshToken,
        accessToken: action.payload.accessToken,
      };
    }
    default: {
      return state;
    }
  }
};

export default currentUserReducer;
