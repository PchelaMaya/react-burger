import { requestApi } from "../../utils/request";
import { AppDispatch } from "../../utils/typeHooks";
import { TUserObj } from "../../utils/types";
import { getUserRequest } from "../../utils/userRequest";

export const GET_USER_REQUEST: "GET_USER_REQUEST" = "GET_USER_REQUEST";
export const GET_USER_SUCCESS: "GET_USER_SUCCESS" = "GET_USER_SUCCESS";
export const GET_USER_FAILED: "GET_USER_FAILED" = "GET_USER_FAILED";

export const DELETE_USER: "DELETE_USER" = "DELETE_USER";
export const UPDATE_TOKEN: "UPDATE_TOKEN" = "UPDATE_TOKEN";

export const loginUser =
  (email: string, password: string, navigate: any) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    requestApi
      .loginUser(email, password)
      .then((res) => {
        console.log(email, password);
        if (res && res.success) {
          localStorage.setItem("refreshToken", res.refreshToken);
          localStorage.setItem(
            "accessToken",
            res.accessToken.split("Bearer ")[1]
          );
          dispatch({
            type: GET_USER_SUCCESS,
            payload: {
              user: res.user,
              accessToken: res.accessToken.split("Bearer ")[1],
              refreshToken: res.refreshToken,
            },
          });
          console.log(res);
          localStorage.setItem("refreshToken", res.refreshToken);
          localStorage.setItem(
            "accessToken",
            res.accessToken.split("Bearer ")[1]
          );
          navigate("/profile", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: GET_USER_FAILED });
      });
  };

export const registerUser =
  (name: string, email: string, password: string, navigate: any) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    requestApi
      .createUser(name, email, password)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            payload: {
              user: res.user,
            },
          });
          localStorage.setItem("refreshToken", res.refreshToken);
          localStorage.setItem(
            "accessToken",
            res.accessToken.split("Bearer ")[1]
          );
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: GET_USER_FAILED });
      });
  };

export const logoutUser = () => (dispatch: AppDispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  requestApi
    .logoutUser()
    .then((res) => {
      dispatch({ type: DELETE_USER });
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateUser =
  (name: string, email: string, password: string) =>
  (dispatch: AppDispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    requestApi
      .updateUser(name, email, password)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            payload: {
              user: res.user,
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: GET_USER_FAILED });
      });
  };

const updateToken = () => (dispatch: AppDispatch) => {
  requestApi
    .updateToken()
    .then((res) => {
      if (res && res.success) {
        localStorage.setItem("refreshToken", res.refreshToken);
        localStorage.setItem(
          "accessToken",
          res.accessToken.split("Bearer ")[1]
        );
        dispatch({
          type: UPDATE_TOKEN,
          payload: {
            accessToken: res.accessToken.split("Bearer ")[1],
            refreshToken: res.refreshToken,
          },
        });
      }
    })
    .then(() => {
      getUserRequest(
        dispatch,
        requestApi,
        GET_USER_REQUEST,
        GET_USER_SUCCESS,
        updateToken
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUser = () => (dispatch: AppDispatch) => {
  getUserRequest(
    dispatch,
    requestApi,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    updateToken
  );
};

export const forgotPassword = (email: string, func: () => void) => () => {
  requestApi
    .forgotPassword(email)
    .then((res) => {
      if (res && res.success) {
        func();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const resetPassword =
  (password: string, token: string, func: () => void) => () => {
    requestApi
      .resetPassword(password, token)
      .then((res) => {
        if (res && res.success) {
          func();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

type TGetUserRequestAction = {
  readonly type: typeof GET_USER_REQUEST;
};

type TGetUserSuccessAction = {
  readonly type: typeof GET_USER_SUCCESS;
  readonly payload: {
    user: TUserObj;
    accessToken: string | null;
    refreshToken: string | null;
  };
};

type TGetUserFailedAction = {
  readonly type: typeof GET_USER_FAILED;
};

type TDeleteUserAction = {
  readonly type: typeof DELETE_USER;
};
type TUPDATE_TOKEN = {
  readonly type: typeof UPDATE_TOKEN;
  readonly payload: {
    accessToken: string | null;
    refreshToken: string | null;
  };
};

export type TCurrentUserActions =
  | TGetUserRequestAction
  | TGetUserSuccessAction
  | TGetUserFailedAction
  | TDeleteUserAction
  | TUPDATE_TOKEN;
