import styles from "./OrdersBoard.module.scss";

type TOrdersBoard = {
  title: string;
  orders: Array<number | null>;
};

export const OrdersBoard = ({ title, orders }: TOrdersBoard) => {
  return (
    <div className={`${styles.ordersboard}`}>
      <p className="text text_type_main-medium">{title}:</p>
      <div className={`${styles.orders}`}>
        {orders.map((item) => {
          return (
            <p
              key={item}
              className={`text text_type_digits-default ${
                title === "Готовы" && styles.orderNumber
              }`}
            >
              {item}
            </p>
          );
        })}
      </div>
    </div>
  );
};
