import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  ADD_TOTALPRICE,
  UPDATE_SORT_INGREDIENTS,
} from "../actions/BurgerConstructor";
const initialState = {
  constructorIngredients: [],
  totalPrice: 0,
};

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return {
        ...state,
        constructorIngredients: [
          ...state.constructorIngredients,
          action.payload,
        ],
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        constructorIngredients: state.constructorIngredients.filter(
          (item) => item.uniqId !== action.payload
        ),
      };
    }
    case ADD_TOTALPRICE: {
      return {
        ...state,
        totalPrice: [...state.constructorIngredients].reduce(
          (total, ingredient) => {
            if (ingredient.type === "bun") {
              return total + ingredient.price * 2;
            } else {
              return (total += ingredient.price);
            }
          },
          0
        ),
      };
    }
    case UPDATE_SORT_INGREDIENTS: {
      const newConstructorIngredients = [...state.constructorIngredients];
      const dragIngredient = newConstructorIngredients[action.dragIndex];
      newConstructorIngredients.splice(action.dragIndex, 1);
      newConstructorIngredients.splice(action.hoverIndex, 0, dragIngredient);

      return {
        ...state,
        constructorIngredients: newConstructorIngredients,
      };
    }
    default: {
      return state;
    }
  }
};
