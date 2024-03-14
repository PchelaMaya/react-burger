import {
  CLOSE_INGREDIENT_POPUP,
  TIngredientDetailsActions,
} from "../actions/IngredientDetails";

type TIngredientDetailsState = {
  isPopupOpened: boolean;
};

export const initialState: TIngredientDetailsState = {
  isPopupOpened: false,
};

export const ingredientDetailsReducer = (
  state = initialState,
  action: TIngredientDetailsActions
) => {
  switch (action.type) {
    case CLOSE_INGREDIENT_POPUP: {
      return { ...state, isPopupOpened: false };
    }
    default: {
      return state;
    }
  }
};
