import {
  ADD_INGREDIENT,
  ADD_TOTALPRICE,
  DELETE_INGREDIENT,
  DELETE_INGREDIENTS,
  UPDATE_SORT_INGREDIENTS,
} from "../actions/BurgerConstructor";
import burgerConstructorReducer, {
  initialState,
} from "../reducers/BurgerConstructor";

describe("burger-constructor", () => {
  const testBurgerConstructorBun = {
    _id: "1234",
    name: "string",
    type: "bun",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
    __v: 0,
    uniqId: "1234",
  };

  const testBurgerConstructorSauce = {
    _id: "1234",
    name: "string",
    type: "sauce",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 110,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
    __v: 0,
    uniqId: "1234",
  };

  test("test initial state", () => {
    expect(burgerConstructorReducer(undefined, {})).toEqual(initialState);
  });

  test("add ingredient", () => {
    const action = { type: ADD_INGREDIENT, payload: testBurgerConstructorBun };
    expect(burgerConstructorReducer(initialState, action)).toEqual({
      ...initialState,
      constructorIngredients: [
        ...initialState.constructorIngredients,
        testBurgerConstructorBun,
      ],
    });
  });

  test("delete ingredient", () => {
    const action = { type: DELETE_INGREDIENT, payload: "1234" };
    expect(
      burgerConstructorReducer(
        {
          ...initialState,
          constructorIngredients: [
            ...initialState.constructorIngredients,
            testBurgerConstructorBun,
          ],
        },
        action
      )
    ).toEqual({
      ...initialState,
      constructorIngredients: [],
    });
  });

  test("delete ingredients", () => {
    const action = { type: DELETE_INGREDIENTS };
    expect(
      burgerConstructorReducer(
        {
          ...initialState,
          constructorIngredients: [
            ...initialState.constructorIngredients,
            testBurgerConstructorBun,
          ],
        },
        action
      )
    ).toEqual(initialState);
  });

  test("add total price", () => {
    const action = { type: ADD_TOTALPRICE };
    expect(
      burgerConstructorReducer(
        {
          ...initialState,
          constructorIngredients: [
            ...initialState.constructorIngredients,
            testBurgerConstructorBun,
            testBurgerConstructorSauce,
          ],
        },
        action
      )
    ).toEqual({
      ...initialState,
      constructorIngredients: [
        ...initialState.constructorIngredients,
        testBurgerConstructorBun,
        testBurgerConstructorSauce,
      ],
      totalPrice: 2086,
    });
  });

  test("update sort ingredients", () => {
    const action = {
      type: UPDATE_SORT_INGREDIENTS,
      dragIndex: 0,
      hoverIndex: 1,
    };
    expect(
      burgerConstructorReducer(
        {
          ...initialState,
          constructorIngredients: [
            ...initialState.constructorIngredients,
            testBurgerConstructorBun,
            testBurgerConstructorSauce,
          ],
        },
        action
      )
    ).toEqual({
      ...initialState,
      constructorIngredients: [
        ...initialState.constructorIngredients,
        testBurgerConstructorSauce,
        testBurgerConstructorBun,
      ],
    });
  });
});
