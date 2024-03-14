import {
  CLOSE_ORDER_POPUP,
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
} from "../actions/Order";
import { initialState, orderReducer } from "../reducers/Order";

describe("Order", () => {
  test("test initial state", () => {
    expect(orderReducer(undefined, {})).toEqual(initialState);
  });

  test("get Order request", () => {
    const action = { type: GET_ORDER_REQUEST };

    expect(orderReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
      isOpenOrderPopup: true,
    });
  });

  test("get Order success", () => {
    const action = {
      type: GET_ORDER_SUCCESS,
      payload: {
        order: {
          number: 7777,
        },
      },
    };

    expect(
      orderReducer(
        {
          ...initialState,
          isLoading: true,
          isOpenOrderPopup: false,
        },
        action
      )
    ).toEqual({
      ...initialState,
      orders: [
        ...initialState.orders,
        {
          order: {
            number: 7777,
          },
        },
      ],
      isLoading: false,
      isOpenOrderPopup: true,
      lastNumberOrder: 7777,
    });
  });

  test("get Order failed", () => {
    const action = { type: GET_ORDER_FAILED };

    expect(
      orderReducer(
        {
          ...initialState,
          lastNumberOrder: 7777,
          isLoading: true,
        },
        action
      )
    ).toEqual({
      ...initialState,
      lastNumberOrder: null,
      isLoading: false,
    });
  });

  test("close Order popup", () => {
    const action = { type: CLOSE_ORDER_POPUP };

    expect(
      orderReducer(
        {
          ...initialState,
          isOpenOrderPopup: true,
        },
        action
      )
    ).toEqual({
      ...initialState,
      isOpenOrderPopup: false,
    });
  });
});
