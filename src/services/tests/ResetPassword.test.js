import { GET_RESET_PASSWORD_PAGE } from "../actions/ResetPassword";
import resetPasswordReducer, { initialState } from "../reducers/ResetPassword";

describe("ResetPassword", () => {
  test("test initial state", () => {
    expect(resetPasswordReducer(undefined, {})).toEqual(initialState);
  });

  test("get ResetPassword page", () => {
    const action = { type: GET_RESET_PASSWORD_PAGE, payload: true };
    expect(resetPasswordReducer(initialState, action)).toEqual({
      ...initialState,
      isOpenResetPasswordPage: true,
    });
  });
});
