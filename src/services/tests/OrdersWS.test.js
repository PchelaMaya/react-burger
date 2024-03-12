import {
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "../actions/OrdersWS";
import wsOrdersReducer from "../reducers/OrdersWS";

describe("OrdersWS", () => {
  const initialState = {
    WSConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
  };
  const orders = ["test", "7777"];

  test("test initial state", () => {
    expect(wsOrdersReducer(undefined, {})).toEqual(initialState);
  });

  test("OrdersWS connection start", () => {
    const action = { type: WS_CONNECTION_START };
    expect(wsOrdersReducer(initialState, action)).toEqual(initialState);
  });

  test("OrdersWS connection success", () => {
    const action = { type: WS_CONNECTION_SUCCESS };
    expect(
      wsOrdersReducer(
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

  test("OrdersWS connection error", () => {
    const action = { type: WS_CONNECTION_ERROR };
    expect(
      wsOrdersReducer(
        {
          ...initialState,
          WSConnected: true,
        },
        action
      )
    ).toEqual({
      ...initialState,
      WSConnected: false,
    });
  });

  test("OrdersWS connection closed", () => {
    const action = { type: WS_CONNECTION_ERROR };
    expect(
      wsOrdersReducer(
        {
          ...initialState,
          WSConnected: true,
        },
        action
      )
    ).toEqual({
      ...initialState,
      WSConnected: false,
    });
  });

  test("OrdersWS get message", () => {
    const action = {
      type: WS_GET_MESSAGE,
      payload: {
        orders: orders,
        total: 8888,
        totalToday: 21212,
      },
    };
    expect(wsOrdersReducer(initialState, action)).toEqual({
      ...initialState,
      orders: orders,
      total: 8888,
      totalToday: 21212,
    });
  });
});
