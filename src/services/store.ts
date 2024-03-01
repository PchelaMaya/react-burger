import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers/rootReducer";
import {
  TWSOrdersActions,
  TWSStoreActions,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "./actions/OrdersWS";
import { TCurrentUserActions } from "./actions/CurrentUser";
import { TBurgerConstructorActions } from "./actions/BurgerConstructor";
import { TIndgredientsActions } from "./actions/Ingredients";
import { TIngredientDetailsActions } from "./actions/IngredientDetails";
import { TResetPasswordActions } from "./actions/ResetPassword";
import { TOrderActions } from "./actions/Order";
import {
  TWSStoreUserOrdersActions,
  WS_USER_ORDERS_CONNECTION_CLOSED,
  WS_USER_ORDERS_CONNECTION_ERROR,
  WS_USER_ORDERS_CONNECTION_START,
  WS_USER_ORDERS_CONNECTION_SUCCESS,
  WS_USER_ORDERS_GET_MESSAGE,
} from "./actions/UserOrdersWS";
import { socketMiddleware } from "../utils/middlewareWS";

export type AppActions =
  | TWSOrdersActions
  | TCurrentUserActions
  | TBurgerConstructorActions
  | TIndgredientsActions
  | TIngredientDetailsActions
  | TResetPasswordActions
  | TOrderActions;

const wsActions: TWSStoreActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

const wsUserOrdersActions: TWSStoreUserOrdersActions = {
  wsInit: WS_USER_ORDERS_CONNECTION_START,
  onOpen: WS_USER_ORDERS_CONNECTION_SUCCESS,
  onClose: WS_USER_ORDERS_CONNECTION_CLOSED,
  onError: WS_USER_ORDERS_CONNECTION_ERROR,
  onMessage: WS_USER_ORDERS_GET_MESSAGE,
};

const wsUrl: string = "wss://norma.nomoreparties.space/orders/all";
const wsUserOrdersUrl: string = "wss://norma.nomoreparties.space/orders";

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      socketMiddleware(wsUrl, wsActions),
      socketMiddleware(wsUserOrdersUrl, wsUserOrdersActions)
    ),
});
export default store;
