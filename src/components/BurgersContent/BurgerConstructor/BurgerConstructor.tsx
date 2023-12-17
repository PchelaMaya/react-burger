import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.scss";
import { ConstructorContent } from "./ConstructorContent/ConstructorContent";

export const BurgerConstructor = () => {
  const cratorBun = "https://code.s3.yandex.net/react/code/bun-02.png";

  return (
    <section className={`mt-25 ${styles.burgerconstructor}`}>
      <ConstructorElement
        type="top"
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail={cratorBun}
        isLocked={true}
      />
      <ConstructorContent />
      <ConstructorElement
        type="bottom"
        text="Краторная булка N-200i (низ)"
        price={200}
        thumbnail={cratorBun}
        isLocked={true}
      />

      <div className={`mt-10 ${styles.offer}`}>
        <p className={`${styles.price} text text_type_digits-medium`}>
          610 <CurrencyIcon type="primary" />
        </p>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};
