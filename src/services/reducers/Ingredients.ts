import { TIngredientObj } from "../../utils/types";
import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_REQUEST,
  TIndgredientsActions,
} from "../actions/Ingredients";

type TIngredientsState = {
  ingredients: Array<TIngredientObj>;
  isLoading: boolean;
};

const initialState: TIngredientsState = {
  ingredients: [],
  isLoading: false,
};

export const ingredientsReducer = (
  state = initialState,
  action: TIndgredientsActions
) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return { ...state, isLoading: true };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return { ...state, ingredients: action.payload, isLoading: false };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state, ingredients: [], isLoading: false };
    }
    default: {
      return state;
    }
  }
};
