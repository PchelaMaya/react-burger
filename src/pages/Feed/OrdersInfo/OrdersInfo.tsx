import { OrdersBoard } from "../../../components/OrdersBoard/OrdersBoard";
import { OrdersStatistic } from "../../../components/OrdersStatistic/OrderStatistic";
import {
  getWSCount,
  getWSCountToday,
  getWSOrders,
} from "../../../services/reducers";
import { useSelector } from "../../../utils/typeHooks";
import styles from "./OrdersInfo.module.scss";

export const OrdersInfo = () => {
  const countToday = useSelector(getWSCountToday);
  const count = useSelector(getWSCount);

  const WSOrders = useSelector(getWSOrders);

  const ordersCreated: Array<number | null> = [];
  const ordersDone: Array<number | null> = [];

  WSOrders.forEach((item) => {
    if (item.status === "done") {
      ordersDone.push(item.number);
    } else {
      ordersCreated.push(item.number);
    }
  });

  return (
    <div className={styles.ordersinfo}>
      <div className={styles.ordersboard}>
        <OrdersBoard title={"Готовы"} orders={ordersDone} />
        <OrdersBoard title={"В работе"} orders={ordersCreated} />
      </div>
      <div className={styles.ordersstatistic}>
        <OrdersStatistic title={"Выполнено за все время"} count={count} />
        <OrdersStatistic title={"Выполнено за сегодня"} count={countToday} />
      </div>
    </div>
  );
};
