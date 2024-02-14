import { CLOSE_INGREDIENT_POPUP } from "../actions/IngredientDetails";

const initialState = {
  isPopupOpened: false,
};

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLOSE_INGREDIENT_POPUP: {
      return { ...state, isPopupOpened: false };
    }
    default: {
      return state;
    }
  }
};
