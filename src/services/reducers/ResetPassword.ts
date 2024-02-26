import {
  GET_RESET_PASSWORD_PAGE,
  TResetPasswordActions,
} from "../actions/ResetPassword";

type TResetPasswordState = {
  isOpenResetPasswordPage: boolean;
};

const initialState: TResetPasswordState = {
  isOpenResetPasswordPage: false,
};

const resetPasswordReducer = (
  state = initialState,
  action: TResetPasswordActions
) => {
  switch (action.type) {
    case GET_RESET_PASSWORD_PAGE: {
      return { ...state, isOpenResetPasswordPage: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default resetPasswordReducer;
