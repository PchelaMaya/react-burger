import {
  DELETE_USER,
  GET_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  UPDATE_TOKEN,
} from "../actions/CurrentUser";
import currentUserReducer from "../reducers/CurrentUser";

describe("CurrentUser", () => {
  const initialState = {
    refreshToken: null,
    accessToken: null,
    isLoading: false,
    currentUser: {
      name: "",
      email: "",
    },
    isLoggedIn: false,
  };

  test("test initial state", () => {
    expect(currentUserReducer(undefined, {})).toEqual(initialState);
  });

  test("get CurrentUser request", () => {
    const action = { type: GET_USER_REQUEST };
    expect(currentUserReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  test("get CurrentUser success", () => {
    const action = {
      type: GET_USER_SUCCESS,
      payload: {
        user: {
          name: "polo",
          email: "polo@ya.ru",
        },
        refreshToken: "5555",
        accessToken: "6666",
      },
    };
    expect(
      currentUserReducer({ ...initialState, isLoading: true }, action)
    ).toEqual({
      ...initialState,
      refreshToken: "5555",
      accessToken: "6666",
      currentUser: {
        name: "polo",
        email: "polo@ya.ru",
      },
      isLoading: false,
      isLoggedIn: true,
    });
  });

  test("get CurrentUser failed", () => {
    const action = { type: GET_USER_FAILED };
    expect(
      currentUserReducer(
        {
          ...initialState,
          refreshToken: "5555",
          accessToken: "6666",
          currentUser: {
            name: "polo",
            email: "polo@ya.ru",
          },
          isLoading: false,
          isLoggedIn: true,
        },
        action
      )
    ).toEqual({
      ...initialState,
      currentUser: { name: "", email: "" },
      refreshToken: null,
      accessToken: null,
      isLoggedIn: false,
      isLoading: false,
    });
  });

  test("delete CurrentUser", () => {
    const action = { type: DELETE_USER };
    expect(
      currentUserReducer(
        {
          ...initialState,
          refreshToken: "5555",
          accessToken: "6666",
          currentUser: {
            name: "polo",
            email: "polo@ya.ru",
          },
          isLoading: false,
          isLoggedIn: true,
        },
        action
      )
    ).toEqual({
      ...initialState,
      currentUser: { name: "", email: "" },
      refreshToken: null,
      accessToken: null,
      isLoggedIn: false,
      isLoading: false,
    });
  });

  test("update token", () => {
    const action = {
      type: UPDATE_TOKEN,
      payload: {
        refreshToken: "5555",
        accessToken: "6666",
      },
    };
    expect(currentUserReducer(initialState, action)).toEqual({
      ...initialState,
      refreshToken: "5555",
      accessToken: "6666",
    });
  });
});
