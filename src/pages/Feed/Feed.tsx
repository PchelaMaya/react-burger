import { useEffect } from "react";
import { useDispatch } from "../../utils/typeHooks";
import styles from "./Feed.module.scss";
import { OrdersFeed } from "./OrdersFeed/OrdersFeed";
import { OrdersInfo } from "./OrdersInfo/OrdersInfo";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../../services/actions/OrdersWS";

export const Feed = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, []);

  return (
    <section className={styles.feed}>
      <h2 className="text text_type_main-large">Лента заказов</h2>

      <div className={`mt-2 ${styles.feedcontent}`}>
        <OrdersFeed />

        <OrdersInfo />
      </div>
    </section>
  );
};
