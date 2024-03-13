import { CLOSE_INGREDIENT_POPUP } from "../actions/IngredientDetails";
import {
  ingredientDetailsReducer,
  initialState,
} from "../reducers/IngredientDetails";

describe("IngredientDetails", () => {
  test("test initial state", () => {
    expect(ingredientDetailsReducer(undefined, {})).toEqual(initialState);
  });

  test("close IngredientDetails popup", () => {
    const action = { type: CLOSE_INGREDIENT_POPUP };

    expect(
      ingredientDetailsReducer(
        {
          ...initialState,
          isPopupOpened: true,
        },
        action
      )
    ).toEqual({
      ...initialState,
      isPopupOpened: false,
    });
  });
});
