import { TOrderInfo } from "../../utils/types";
import {
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  CLOSE_ORDER_POPUP,
  TOrderActions,
} from "../actions/Order";

type TOrderState = {
  orders: Array<TOrderInfo>;
  lastNumberOrder: number | null;
  isLoading: boolean;
  isOpenOrderPopup: boolean;
};

export const initialState: TOrderState = {
  orders: [],
  lastNumberOrder: null,
  isLoading: false,
  isOpenOrderPopup: false,
};

export const orderReducer = (state = initialState, action: TOrderActions) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return { ...state, isLoading: true, isOpenOrderPopup: true };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orders: [...state.orders, action.payload],
        isLoading: false,
        lastNumberOrder: action.payload.order.number,
        isOpenOrderPopup: true,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orders: [...state.orders],
        lastNumberOrder: null,
        isLoading: false,
      };
    }
    case CLOSE_ORDER_POPUP: {
      return { ...state, isOpenOrderPopup: false };
    }
    default: {
      return state;
    }
  }
};
