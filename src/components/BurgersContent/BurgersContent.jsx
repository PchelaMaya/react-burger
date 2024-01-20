import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { BurgerConstructor } from "./BurgerConstructor/BurgerConstructor";
import { BurgerIngredients } from "./BurgerIngredients/BurgerIngredients";
import { requestApi } from "../../utils/request";
import styles from "./BurgersContent.module.scss";
import { getIngredients } from "../../services/actions/Ingredients";

export const BurgersContent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients(requestApi));
  }, [dispatch]);

  return (
    <section className={styles.burgerscontent}>
      <BurgerIngredients />
      <BurgerConstructor />
    </section>
  );
};
