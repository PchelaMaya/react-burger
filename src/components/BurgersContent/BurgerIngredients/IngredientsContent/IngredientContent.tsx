import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../types";
import styles from "./IngredientContent.module.scss";

export const IngredientContent = (props: any) => {
  return (
    <div className={styles.ingredientitem}>
      <div className={styles.image}>
        <img src={props.data.image} />
        <Counter count={1} />
      </div>
      <p className="text text_type_digits-default">
        {props.data.price} <CurrencyIcon type="primary" />
      </p>
      <p className="text text_type_main-default">{props.data.name}</p>
    </div>
  );
};

IngredientContent.propTypes = {
  data: ingredientPropType,
};
