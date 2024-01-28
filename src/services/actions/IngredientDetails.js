export const OPEN_INGREDIENT_POPUP = "OPEN_INGREDIENT_POPUP";
export const CLOSE_INGREDIENT_POPUP = "CLOSE_INGREDIENT_POPUP";

export const addIngredientPopup = () => ({
  type: OPEN_INGREDIENT_POPUP,
});
export const closeIngredientPopup = () => ({ type: CLOSE_INGREDIENT_POPUP });
