export const OPEN_INGREDIENT_POPUP = "OPEN_INGREDIENT_POPUP";
export const CLOSE_INGREDIENT_POPUP = "CLOSE_INGREDIENT_POPUP";

export const addIngredientPopup = (ingredientObj) => ({
  type: OPEN_INGREDIENT_POPUP,
  payload: ingredientObj,
});
export const closeIngredientPopup = () => ({ type: CLOSE_INGREDIENT_POPUP });
