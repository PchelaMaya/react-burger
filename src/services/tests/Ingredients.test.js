import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
} from "../actions/Ingredients";
import { ingredientsReducer } from "../reducers/Ingredients";

describe("Ingredients", () => {
  const testData = {
    _id: "7777",
    name: "string",
    type: "main",
    proteins: 808,
    fat: 689,
    carbohydrates: 609,
    calories: 986,
    price: 300,
    image: "https://code.s3.yandex.net/react/code/mineral_rings.png",
    image_mobile:
      "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
    image_large:
      "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
    __v: 0,
  };

  const initialState = {
    ingredients: [],
    isLoading: false,
  };

  test("test initial state", () => {
    expect(ingredientsReducer(undefined, {})).toEqual(initialState);
  });

  test("get Ingredients request", () => {
    const action = { type: GET_INGREDIENTS_REQUEST };

    expect(ingredientsReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  test("get Ingredients success", () => {
    const action = {
      type: GET_INGREDIENTS_SUCCESS,
      payload: [testData],
    };

    expect(
      ingredientsReducer(
        {
          ...initialState,
          isLoading: true,
        },
        action
      )
    ).toEqual({
      ...initialState,
      isLoading: false,
      ingredients: [testData],
    });
  });

  test("get Ingredients failed", () => {
    const action = { type: GET_INGREDIENTS_FAILED };

    expect(
      ingredientsReducer(
        {
          ...initialState,
          isLoading: false,
          ingredients: [testData],
        },
        action
      )
    ).toEqual({
      ...initialState,
      ingredients: [],
      isLoading: false,
    });
  });
});
