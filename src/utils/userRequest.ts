import { TGetUser } from "./types";
import { AppDispatch } from "./typeHooks";

interface IRequestApi {
  getUser: () => Promise<TGetUser>;
}

type TErrFunc = () => (dispatch: AppDispatch) => void;

export const getUserRequest = (
  dispatch: AppDispatch,
  requestApi: IRequestApi,
  GET_USER_REQUEST: string,
  GET_USER_SUCCESS: string,
  errFunc: TErrFunc
) => {
  dispatch({ type: GET_USER_REQUEST });
  requestApi
    .getUser()
    .then((res: TGetUser) => {
      if (res && res.success) {
        dispatch({
          type: GET_USER_SUCCESS,
          payload: {
            user: res.user,
            accessToken: localStorage.getItem("accessToken"),
            refreshToken: localStorage.getItem("refreshToken"),
          },
        });
      }
    })
    .catch((err: string) => {
      console.log(err);
      if (errFunc && localStorage.getItem("refreshToken")) {
        dispatch(errFunc());
      }
    });
};
