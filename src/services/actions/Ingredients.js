export const GET_INGREDIENTS_REQUEST = "GET_INGEADIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const getIngredients = (requestApi) => (dispatch) => {
  dispatch({ type: GET_INGREDIENTS_REQUEST });
  requestApi
    .getIngredients()
    .then((res) => {
      dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: res.data });
    })
    .catch(() => {
      dispatch({ type: GET_INGREDIENTS_FAILED });
    });
};
