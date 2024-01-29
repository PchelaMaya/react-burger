import { requestApi } from "../../utils/request";
import { getUserRequest } from "../../utils/userRequest";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";
export const DELETE_USER = "DELETE_USER";

export const loginUser =
  ({ email, password }, navigate) =>
  (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    requestApi
      .loginUser(email, password)
      .then((res) => {
        console.log(email, password);
        if (res && res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            payload: {
              user: res.user,
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
  ({ name, email, password }, navigate) =>
  (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    console.log(name, email, password);
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

export const logoutUser = () => (dispatch) => {
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

export const updateUser = (data, accessToken) => (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  requestApi
    .updateUser(data.name, data.email)
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

const updateToken = () => (dispatch) => {
  requestApi
    .updateToken()
    .then((res) => {
      if (res && res.success) {
        localStorage.setItem("refreshToken", res.refreshToken);
        localStorage.setItem(
          "accessToken",
          res.accessToken.split("Bearer ")[1]
        );
      }
    })
    .then(() => {
      getUserRequest(dispatch, requestApi, GET_USER_REQUEST, GET_USER_SUCCESS);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUser = () => (dispatch) => {
  getUserRequest(
    dispatch,
    requestApi,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    updateToken
  );
};

export const forgotPassword = (email, func) => {
  return (dispatch) => {
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
};

export const resetPassword = (password, token, func) => {
  return (dispatch) => {
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
};
