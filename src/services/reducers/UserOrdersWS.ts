import { TOrder } from "../../utils/types";
import {
  TWSOrdersActions,
  WS_USER_ORDERS_CONNECTION_CLOSED,
  WS_USER_ORDERS_CONNECTION_ERROR,
  WS_USER_ORDERS_CONNECTION_START,
  WS_USER_ORDERS_CONNECTION_SUCCESS,
  WS_USER_ORDERS_GET_MESSAGE,
} from "../actions/UserOrdersWS";

type TWSOrdersState = {
  WSConnected: boolean;
  userOrders: Array<TOrder>;
  total: number;
  totalToday: number;
};

export const initialState: TWSOrdersState = {
  WSConnected: false,
  userOrders: [],
  total: 0,
  totalToday: 0,
};

const wsUserOrdersReducer = (
  state = initialState,
  action: TWSOrdersActions
) => {
  switch (action.type) {
    case WS_USER_ORDERS_CONNECTION_START: {
      return {
        ...state,
      };
    }
    case WS_USER_ORDERS_CONNECTION_SUCCESS: {
      return {
        ...state,
        WSConnected: true,
      };
    }
    case WS_USER_ORDERS_CONNECTION_ERROR: {
      return {
        ...state,
        WSConnected: false,
        userOrders: [],
      };
    }
    case WS_USER_ORDERS_CONNECTION_CLOSED: {
      return {
        ...state,
        WSConnected: false,
        userOrders: [],
        total: 0,
        totalToday: 0,
      };
    }
    case WS_USER_ORDERS_GET_MESSAGE: {
      return {
        ...state,
        userOrders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    }
    default: {
      return state;
    }
  }
};

export default wsUserOrdersReducer;
