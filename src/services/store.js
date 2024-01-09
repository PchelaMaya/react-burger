import { configureStore } from "@reduxjs/toolkit";
import { ingredientsReducer } from "./reducers/Ingredients";
import { ingredientDetailsReducer } from "./reducers/IngredientDetails";
import { burgerConstructorReducer } from "./reducers/BurgerConstructor";
import { orderReducer } from "./reducers/Order";

const rootReducer = {
  ingredients: ingredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});
