import {
  WS_USER_ORDERS_CONNECTION_CLOSED,
  WS_USER_ORDERS_CONNECTION_ERROR,
  WS_USER_ORDERS_CONNECTION_START,
  WS_USER_ORDERS_CONNECTION_SUCCESS,
  WS_USER_ORDERS_GET_MESSAGE,
} from "../actions/UserOrdersWS";
import wsUserOrdersReducer, { initialState } from "../reducers/UserOrdersWS";

describe("UserOrders", () => {
  const orders = ["test", "7777"];

  test("test initial state", () => {
    expect(wsUserOrdersReducer(undefined, {})).toEqual(initialState);
  });

  test("UserOrdersWS connecntion start", () => {
    const action = { type: WS_USER_ORDERS_CONNECTION_START };
    expect(wsUserOrdersReducer(initialState, action)).toEqual(initialState);
  });

  test("UserOrdersWS connection success", () => {
    const action = { type: WS_USER_ORDERS_CONNECTION_SUCCESS };
    expect(
      wsUserOrdersReducer(
        {
          ...initialState,
          WSConnected: false,
        },
        action
      )
    ).toEqual({
      ...initialState,
      WSConnected: true,
    });
  });

  test("UserOrdersWS connection error", () => {
    const action = { type: WS_USER_ORDERS_CONNECTION_ERROR };
    expect(
      wsUserOrdersReducer(
        {
          ...initialState,
          WSConnected: true,
          userOrders: orders,
        },
        action
      )
    ).toEqual({
      ...initialState,
      WSConnected: false,
      userOrders: [],
    });
  });

  test("UserOrdersWS connection closed", () => {
    const action = { type: WS_USER_ORDERS_CONNECTION_CLOSED };
    expect(
      wsUserOrdersReducer(
        {
          ...initialState,
          WSConnected: true,
          userOrders: orders,
        },
        action
      )
    ).toEqual({
      ...initialState,
      WSConnected: false,
      userOrders: [],
    });
  });

  test("UserOrdersWS get message", () => {
    const action = {
      type: WS_USER_ORDERS_GET_MESSAGE,
      payload: {
        orders: orders,
        total: 8888,
        totalToday: 21212,
      },
    };
    expect(wsUserOrdersReducer(initialState, action)).toEqual({
      ...initialState,
      userOrders: orders,
      total: 8888,
      totalToday: 21212,
    });
  });
});
