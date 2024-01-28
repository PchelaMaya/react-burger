import {
  OPEN_INGREDIENT_POPUP,
  CLOSE_INGREDIENT_POPUP,
} from "../actions/IngredientDetails";
const initialState = {
  isPopupOpened: false,
};

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_INGREDIENT_POPUP: {
      return { ...state, isPopupOpened: true };
    }
    case CLOSE_INGREDIENT_POPUP: {
      return { ...state, isPopupOpened: false };
    }
    default: {
      return state;
    }
  }
};
