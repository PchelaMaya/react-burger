import { AppDispatch } from "../../utils/typeHooks";
import { TIngredientObj, TIngredients } from "../../utils/types";

export const GET_INGREDIENTS_REQUEST: "GET_INGEADIENTS_REQUEST" =
  "GET_INGEADIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" =
  "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" =
  "GET_INGREDIENTS_FAILED";

export const getIngredients = (requestApi: any) => (dispatch: AppDispatch) => {
  dispatch({ type: GET_INGREDIENTS_REQUEST });
  requestApi
    .getIngredients()
    .then((res: TIngredients) => {
      dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: res.data });
    })
    .catch(() => {
      dispatch({ type: GET_INGREDIENTS_FAILED });
    });
};
type TGetIngredientsRequestAction = {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
};

type TGetIngredientsSuccessAction = {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: Array<TIngredientObj>;
};

type TGetIngredientsFailedAction = {
  readonly type: typeof GET_INGREDIENTS_FAILED;
};

export type TIndgredientsActions =
  | TGetIngredientsRequestAction
  | TGetIngredientsSuccessAction
  | TGetIngredientsFailedAction;
