import { Dispatch } from "redux"; // Импортируйте тип Dispatch из redux, если вы используете его
import { TGetUser } from "./types";

interface IAction {
  type: string;
  payload?: any;
}

type TDispatch = Dispatch<IAction>;

interface IRequestApi {
  getUser: () => Promise<TGetUser>;
}

type TErrFunc = () => IAction;

export const getUserRequest = (
  dispatch: TDispatch,
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
          },
        });
      }
    })
    .catch((err: any) => {
      console.log(err);
      if (errFunc && localStorage.getItem("refreshToken")) {
        dispatch(errFunc());
      }
    });
};
