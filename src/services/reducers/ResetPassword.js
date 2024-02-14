import { GET_RESET_PASSWORD_PAGE } from "../actions/ResetPassword";

const initialState = {
  isOpenResetPasswordPage: false,
};

const resetPasswordReducer = (state = initialState, action) => {
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
