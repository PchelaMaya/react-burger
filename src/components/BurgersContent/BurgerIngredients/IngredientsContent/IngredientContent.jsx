import { useMemo } from "react";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { getBurgerConstructorIngredients } from "../../../../services/reducers";
import styles from "./IngredientContent.module.scss";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export const IngredientContent = ({ image, price, name, ingredient }) => {
  const location = useLocation();

  const constructorIngredients = useSelector(getBurgerConstructorIngredients);

  const count = useMemo(() => {
    const checkedIngredient = constructorIngredients.filter((item) => {
      return item._id === ingredient._id;
    });
    if (checkedIngredient.length > 0) {
      if (ingredient.type === "bun") {
        return 2;
      } else {
        return checkedIngredient.length;
      }
    }
  }, [constructorIngredients, ingredient]);

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });

  return (
    <>
      <Link
        to={`/ingredient/${ingredient._id}`}
        state={{ background: location }}
        className={styles.ingredientitem}
        ref={dragRef}
      >
        <div className={styles.image}>
          <img src={image} alt={name} />
          {count && <Counter count={count} size="default" />}
        </div>
        <p className="text text_type_digits-default">
          {price} <CurrencyIcon type="primary" />
        </p>
        <p className="text text_type_main-default">{name}</p>
      </Link>
    </>
  );
};

IngredientContent.propTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  count: PropTypes.number,
  ingredientClick: PropTypes.func.isRequired,
  ingredient: PropTypes.object.isRequired,
};
