export const GET_RESET_PASSWORD_PAGE = "GET_RESET_PASSWORD_PAGE";

export const openResetPasswordPage = () => (dispatch) => {
  dispatch({
    type: GET_RESET_PASSWORD_PAGE,
    payload: true,
  });
};
