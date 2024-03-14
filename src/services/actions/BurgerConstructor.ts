import { TIngredientObj, TIngredientObjConstructor } from "../../utils/types";
import { AppDispatch } from "../../utils/typeHooks";
export const ADD_INGREDIENT: "ADD_INGREDIENT" = "ADD_INGREDIENT";
export const DELETE_INGREDIENT: "DELETE_INGREDIENT" = "DELETE_INGREDIENT";
export const ADD_TOTALPRICE: "ADD_TOTALPRICE" = "ADD_TOTALPRICE";
export const UPDATE_SORT_INGREDIENTS = "UPDATE_SORT_INGREDIENTS";
export const DELETE_INGREDIENTS: "DELETE_INGREDIENTS" = "DELETE_INGREDIENTS";

export const addIngredient = (ingredientObj: TIngredientObj, id: string) => ({
  type: ADD_INGREDIENT,
  payload: { ...ingredientObj, uniqId: id },
});
export const deleteIngredient = (uniqId: string) => ({
  type: DELETE_INGREDIENT,
  payload: uniqId,
});
export const updateTotalPrice = () => ({ type: ADD_TOTALPRICE });

export const deleteIngredientsConstructor = () => (dispatch: AppDispatch) => {
  dispatch({ type: DELETE_INGREDIENTS });
};

type TAddIngredientAction = {
  readonly type: typeof ADD_INGREDIENT;
  readonly payload: TIngredientObjConstructor;
};

type TDeleteIngredientAction = {
  readonly type: typeof DELETE_INGREDIENT;
  readonly payload: string;
};

type TDeleteIngredientsAction = {
  readonly type: typeof DELETE_INGREDIENTS;
};

type TAddTotalPriceAction = {
  readonly type: typeof ADD_TOTALPRICE;
};

type TUpdateSortIngredientsAction = {
  readonly type: typeof UPDATE_SORT_INGREDIENTS;
  dragIndex: number;
  hoverIndex: number;
};

export type TBurgerConstructorActions =
  | TAddIngredientAction
  | TDeleteIngredientAction
  | TDeleteIngredientsAction
  | TAddTotalPriceAction
  | TUpdateSortIngredientsAction;
