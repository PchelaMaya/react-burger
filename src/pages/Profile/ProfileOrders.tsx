import { useEffect } from "react";
import { getUserOrders } from "../../services/reducers";
import { useAppDispatch, useSelector } from "../../utils/typeHooks";
import {
  WS_USER_ORDERS_CONNECTION_CLOSED,
  WS_USER_ORDERS_CONNECTION_START,
} from "../../services/actions/UserOrdersWS";
import styles from "./Profile.module.scss";
import { Order } from "../../components/Order/Order";

export const ProfileOrders = () => {
  const wsUserOrders = useSelector(getUserOrders);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: WS_USER_ORDERS_CONNECTION_START });

    return () => {
      dispatch({ type: WS_USER_ORDERS_CONNECTION_CLOSED });
    };
  }, []);

  return (
    <div>
      {wsUserOrders !== undefined &&
        wsUserOrders
          .map((item) => {
            return (
              <Order
                key={item._id}
                status={item.status}
                name={item.name}
                number={item.number}
                ingredients={item.ingredients}
                date={item.createdAt}
              />
            );
          })
          .reverse()}
    </div>
  );
};
