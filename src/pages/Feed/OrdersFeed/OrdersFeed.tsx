import { Order } from "../../../components/Order/Order";
import { getWSOrders } from "../../../services/reducers";
import { useSelector } from "../../../utils/typeHooks";
import styles from "./OrdersFeed.module.scss";

export const OrdersFeed = () => {
  const wsOrders = useSelector(getWSOrders);

  return (
    <div className={`${styles.container}`}>
      <div className={`pr-4 ${styles.contant}`}>
        {wsOrders.map((item) => {
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
        })}
      </div>
    </div>
  );
};
