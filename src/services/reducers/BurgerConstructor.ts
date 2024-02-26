import { TIngredientObjConstructor } from "../../utils/types";
import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  ADD_TOTALPRICE,
  UPDATE_SORT_INGREDIENTS,
  TBurgerConstructorActions,
} from "../actions/BurgerConstructor";

type TBurgerConstructorState = {
  constructorIngredients: Array<TIngredientObjConstructor>;
  totalPrice: number;
};

const initialState: TBurgerConstructorState = {
  constructorIngredients: [],
  totalPrice: 0,
};

const burgerConstructorReducer = (
  state = initialState,
  action: TBurgerConstructorActions
) => {
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
          (total, ingradient) => {
            if (ingradient.type === "bun") {
              return total + ingradient.price * 2;
            } else {
              return (total += ingradient.price);
            }
          },
          0
        ),
      };
    }
    case UPDATE_SORT_INGREDIENTS: {
      const newConstructorIngredients = [...state.constructorIngredients];
      const dragIngradient = newConstructorIngredients[action.dragIndex];
      newConstructorIngredients.splice(action.dragIndex, 1);
      newConstructorIngredients.splice(action.hoverIndex, 0, dragIngradient);

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

export default burgerConstructorReducer;
