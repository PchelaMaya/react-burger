import { BurgerConstructor } from "./BurgerConstructor/BurgerConstructor";
import { BurgerIngredients } from "./BurgerIngredients/BurgerIngredients";
import styles from "./BurgersContent.module.scss";

export const BurgersContent = () => {
  return (
    <section className={styles.burgerscontent}>
      <BurgerIngredients />
      <BurgerConstructor />
    </section>
  );
};
