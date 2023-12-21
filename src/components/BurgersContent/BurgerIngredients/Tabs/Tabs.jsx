import { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Tabs.module.scss";

export const Tabs = () => {
  const [current, setCurrent] = useState("one");
  return (
    <div className={`mt-5 ${styles.tabs}`}>
      <Tab value="one" active={current === "one"} onClick={setCurrent}>
        Бургеры
      </Tab>
      <Tab value="two" active={current === "two"} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="three" active={current === "three"} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
};
