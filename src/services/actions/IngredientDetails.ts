export const CLOSE_INGREDIENT_POPUP: "CLOSE_INGREDIENT_POPUP" =
  "CLOSE_INGREDIENT_POPUP";

export const closeIngredientPopup = () => ({ type: CLOSE_INGREDIENT_POPUP });

type TCloseIngredientPopupAction = {
  readonly type: typeof CLOSE_INGREDIENT_POPUP;
};

export type TIngredientDetailsActions = TCloseIngredientPopupAction;
