import { TOrder } from "../../utils/types";
import {
  TWSOrdersActions,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "../actions/OrdersWS";

type TWSOrdersState = {
  WSConnected: boolean;
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
};

const initialState: TWSOrdersState = {
  WSConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

const wsOrdersReducer = (state = initialState, action: TWSOrdersActions) => {
  switch (action.type) {
    case WS_CONNECTION_START: {
      return {
        ...state,
      };
    }
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        WSConnected: true,
      };
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        WSConnected: false,
      };
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        WSConnected: false,
      };
    }
    case WS_GET_MESSAGE: {
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    }
    default: {
      return state;
    }
  }
};

export default wsOrdersReducer;
