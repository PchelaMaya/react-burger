import { combineReducers } from "redux";
import ingredientsReducer from "./Ingredients";
import burgerConstructorReducer from "./BurgerConstructor";
import orderReducer from "./Order";
import ingredientDetailsReducer from "./IngredientDetails";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  order: orderReducer,
});
