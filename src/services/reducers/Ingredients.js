import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_REQUEST,
} from "../actions/Ingredients";
const initialState = {
  ingredients: [],
  isLoading: false,
  error: null,
};

export const ingredientsReducer = (state = initialState, action) => {
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
