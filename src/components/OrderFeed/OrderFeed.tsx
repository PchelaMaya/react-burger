import { useParams } from "react-router-dom";
import styles from "./OrderFeed.module.scss";
import { useEffect, useState } from "react";

import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../utils/typeHooks";
import { getIngredients } from "../../services/reducers";
import { TIngredientObj, TOrder } from "../../utils/types";
import { requestApi } from "../../utils/request";
import { CanceledOrder } from "./CanceledOrder";

export const OrderFeed = () => {
  const { number } = useParams();

  const ingredientsAll = useSelector(getIngredients);

  const [price, setPrice] = useState(0);

  const [ingredients, setIngredients] = useState<
    Array<TIngredientObj | undefined>
  >([]);

  const [order, setOrder] = useState<TOrder | null>(null);

  useEffect(() => {
    if (number && ingredientsAll.length > 0) {
      requestApi.getOrder(number).then((res) => {
        res.orders.map((item) => {
          setOrder(item);
        });
      });
    }
  }, [ingredientsAll]);

  useEffect(() => {
    if (order) {
      if (order) {
        let newPrice: number = 0;
        const orderIngredients = order.ingredients.map((ingredient) => {
          return ingredientsAll.find((item) => {
            if (item._id === ingredient) {
              newPrice += item.price;
              return item;
            }
          });
        });
        setPrice(newPrice);
        const uniqOrderIngredients = new Set(orderIngredients);
        setIngredients(Array.from(uniqOrderIngredients));
      }
    }
  }, [order, ingredientsAll]);

  return (
    <>
      {order && ingredients && ingredients.length > 0 && (
        <div className={`${styles.orderfeed}`}>
          <p className={`text text_type_digits-default ${styles.number}`}>
            #{order.number}
          </p>
          <div className="mt-10">
            <div>
              <h2 className="text text_type_main-medium">{order.name}</h2>

              {order.status === "created" && (
                <p className="text text_type_main-default mt-3">Создан</p>
              )}
              {order.status === "pending" && (
                <p className="text text_type_main-default mt-3">Готовится</p>
              )}
              {order.status === "done" && (
                <p
                  className={`text text_type_main-default mt-3 ${styles.textdone}`}
                >
                  Выполнен
                </p>
              )}
              {order.status === "cancelled" && <CanceledOrder />}
            </div>
            <div className={styles.ordercontent}>
              <p className={`text text_type_main-medium mt-15`}>Состав:</p>
              <div className={`${styles.ingredients} pr-2 mt-6`}>
                {ingredients.map((item) => {
                  const total = order.ingredients.filter(
                    (ingredient) => ingredient === item?._id
                  ).length;
                  if (item) {
                    return (
                      <div key={item._id} className={styles.ingredient}>
                        <div className={styles.ingredientname}>
                          <img
                            className={`${styles.image}`}
                            src={item.image}
                            alt="picture"
                          />
                          <p
                            className={`text text_type_main-default ml-4 ${styles.name}`}
                          >
                            {item.name}
                          </p>
                        </div>
                        <p
                          className={`text text_type_digits-default ml-4 ${styles.total}`}
                        >
                          {total} x {item.price} <CurrencyIcon type="primary" />
                        </p>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div className={`${styles.footer} mt-10`}>
              <p className="text text_type_main-default text_color_inactive">
                <FormattedDate date={new Date(order.createdAt)} />
              </p>
              <p className={`text text_type_digits-default ${styles.total}`}>
                {price} <CurrencyIcon type="primary" />
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
