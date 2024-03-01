import { Middleware } from "redux";
import { TWSStoreActions } from "../services/actions/OrdersWS";
import { TWSStoreUserOrdersActions } from "../services/actions/UserOrdersWS";

export const socketMiddleware = (
  wsUrl: string,
  wsActions: TWSStoreActions | TWSStoreUserOrdersActions
): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action: any) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit) {
        const accessToken: string | null = localStorage.getItem("accessToken");
        socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const dataParsed = JSON.parse(data);
          const { success, ...restDataParsed } = dataParsed;
          dispatch({
            type: onMessage,
            payload: restDataParsed,
          });
        };
      }
      next(action);
    };
  };
};
