import styles from "./Order.module.scss";
import { Link, useLocation } from "react-router-dom";
import { TIngredientObj } from "../../utils/types";
import { useSelector } from "../../utils/typeHooks";
import { getIngredients } from "../../services/reducers";
import { IngredientItem } from "./IngredientItem/IngredientItem";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

type TOrderComponent = {
  number: number;
  name: string;
  ingredients: Array<string>;
  date: string;
  status: string;
};

export const Order = ({
  status,
  number,
  name,
  ingredients,
  date,
}: TOrderComponent) => {
  const location = useLocation();

  const allIngredients: Array<TIngredientObj> = useSelector(getIngredients);
  let orderPrice: number = 0;

  const iconIngredients: (TIngredientObj | undefined)[] = ingredients.map(
    (ingredient) => {
      const iconIngredient = allIngredients.find((item) => {
        if (item._id === ingredient) {
          orderPrice += item.price;
          return item;
        }
      });

      return iconIngredient;
    }
  );

  const count: number | undefined =
    iconIngredients.length - 5 > 0 ? iconIngredients.length - 5 : undefined;

  return (
    <Link
      to={`/feed/${number}`}
      state={{ background: location }}
      className={styles.link}
    >
      <div className={`p-6 mb-4 ${styles.order}`}>
        434
        <div className={`${styles.data}`}>
          <p className={`text text_type_digits-default`}>{number}</p>
          <div className={`text text_type_main-default text_color_inactive`}>
            <FormattedDate date={new Date(date)} />
          </div>
        </div>
        <h2 className={`mt-6 mb-2 text text_type_main-medium`}>{name}</h2>
        <div className={`text text_type_main-small mb-6`}>
          {status === "created" && <p>Создан</p>}
          {status === "pending" && <p>Готовится</p>}
          {status === "done" && (
            <p className={`${styles.textDone}`}>Выполнен</p>
          )}
        </div>
        <div className={`${styles.content}`}>
          <div className={`pl-5 ${styles.container}`}>
            {iconIngredients.map(
              (item: TIngredientObj | undefined, index: number) => {
                if (index < 6) {
                  let last;
                  if (count !== undefined && index === 5) {
                    last = true;
                  }
                  if (item !== undefined) {
                    return (
                      <IngredientItem
                        key={item?._id}
                        count={count}
                        last={last}
                        link={item.image}
                      />
                    );
                  }
                }
              }
            )}
          </div>
          <span className={`${styles.price}`}>
            <p className="text text_type_digits-default mr-2">{orderPrice}</p>
            <CurrencyIcon type="primary" />
          </span>
        </div>
      </div>
    </Link>
  );
};
