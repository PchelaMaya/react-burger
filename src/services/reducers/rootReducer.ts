import { combineReducers } from "redux";
import { ingredientsReducer } from "./Ingredients";
import { ingredientDetailsReducer } from "./IngredientDetails";
import { orderReducer } from "./Order";
import currentUserReducer from "./CurrentUser";
import burgerConstructorReducer from "./BurgerConstructor";
import resetPasswordReducer from "./ResetPassword";
import wsOrdersReducer from "./OrdersWS";
import wsUserOrdersReducer from "./UserOrdersWS";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  order: orderReducer,
  currentUser: currentUserReducer,
  resetPassword: resetPasswordReducer,
  wsOrders: wsOrdersReducer,
  wsUserOrders: wsUserOrdersReducer,
});
