import { combineReducers } from "redux";
import { ingredientsReducer } from "./Ingredients";
import { burgerConstructorReducer } from "./BurgerConstructor";
import { ingredientDetailsReducer } from "./IngredientDetails";
import { orderReducer } from "./Order";
import currentUserReducer from "./CurrentUser";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  order: orderReducer,
  currentUser: currentUserReducer,
});
