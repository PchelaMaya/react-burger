import { deleteIngredientsConstructor } from "./BurgerConstructor";

export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const CLOSE_ORDER_POPUP = "CLOSE_ORDER_POPUP";

export const getOrder = (requestApi, ingredientsObj) => (dispatch) => {
  dispatch({ type: GET_ORDER_REQUEST });
  requestApi
    .addOrder(ingredientsObj)
    .then((res) => {
      dispatch({ type: GET_ORDER_SUCCESS, payload: res });
    })
    .then((res) => {
      dispatch(deleteIngredientsConstructor());
    })
    .catch(() => {
      dispatch({ type: GET_ORDER_FAILED });
    });
};

export const closeOrderPopup = () => (dispatch) => {
  dispatch({ type: CLOSE_ORDER_POPUP });
};
