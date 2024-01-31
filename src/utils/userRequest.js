export function getUserRequest(
  dispatch,
  requestApi,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  errFunc
) {
  dispatch({ type: GET_USER_REQUEST });
  requestApi
    .getUser()
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
      if (errFunc && localStorage.getItem("refreshToken")) {
        dispatch(errFunc());
      }
    });
}
