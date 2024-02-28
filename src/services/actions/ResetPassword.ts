import { AppDispatch } from "../../utils/typeHooks";

export const GET_RESET_PASSWORD_PAGE: "GET_RESET_PASSWORD_PAGE" =
  "GET_RESET_PASSWORD_PAGE";

export const openResetPasswordPage = () => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_RESET_PASSWORD_PAGE,
    payload: true,
  });
};

type TGetResetPasswordPageAction = {
  readonly type: typeof GET_RESET_PASSWORD_PAGE;
  readonly payload: boolean;
};

export type TResetPasswordActions = TGetResetPasswordPageAction;
