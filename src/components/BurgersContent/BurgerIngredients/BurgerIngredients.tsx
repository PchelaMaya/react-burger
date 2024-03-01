import { useEffect, useRef, useState } from "react";

import { Tabs } from "./Tabs/Tabs";
import { IngredientContent } from "./IngredientsContent/IngredientContent";
import styles from "./BurgerIngredients.module.scss";
import { useSelector } from "../../../utils/typeHooks";
import { TIngredientObj } from "../../../utils/types";
import { getIngredients } from "../../../services/reducers";

type TIngredientType = "bun" | "sauce" | "main";

export const BurgerIngredients = () => {
  const [current, setCurrent] = useState("Булки");

  const ingredients: Array<TIngredientObj> = useSelector(getIngredients);

  const containerRef = useRef<HTMLDivElement>(null);

  const bunRef = useRef<HTMLHeadingElement>(null);
  const sauceRef = useRef<HTMLHeadingElement>(null);
  const mainRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      handleScroll();
      containerRef.current.addEventListener("scroll", handleScroll);

      return () => {
        if (containerRef.current) {
          containerRef.current.removeEventListener("scroll", handleScroll);
        }
      };
    }
  }, []);

  function handleScroll() {
    if (
      containerRef.current &&
      bunRef.current &&
      sauceRef.current &&
      mainRef.current
    ) {
      const containerTop = containerRef.current.getBoundingClientRect().top;

      const bunDistance = Math.abs(
        bunRef.current.getBoundingClientRect().top - containerTop
      );
      const mainDistance = Math.abs(
        mainRef.current.getBoundingClientRect().top - containerTop
      );
      const sauceDistance = Math.abs(
        sauceRef.current.getBoundingClientRect().top - containerTop
      );

      const closestDistance = Math.min(
        bunDistance,
        mainDistance,
        sauceDistance
      );

      if (closestDistance === bunDistance) {
        setCurrent("Булки");
      } else if (closestDistance === mainDistance) {
        setCurrent("Начинки");
      } else if (closestDistance === sauceDistance) {
        setCurrent("Соусы");
      }
    }
  }

  const filteredIngredientsType = (type: TIngredientType) => {
    return ingredients.filter((item) => item?.type === type);
  };

  return (
    <section className={`mt-10 ${styles.burgeringredients}`}>
      <h2 className="text text_type_main-large">Соберите бургер</h2>
      <Tabs current={current} setCurrent={setCurrent} />

      <div
        className={`mt-10 custom-scroll ${styles.ingredientsitem}`}
        id="containerElement"
        ref={containerRef}
        onScroll={handleScroll}
      >
        <div className="mb-10">
          <h3 className="text text_type_main-medium" id="bun" ref={bunRef}>
            Булки
          </h3>
          <div className={`mt-6 ${styles.itemcontent}`}>
            {filteredIngredientsType("bun").map((item) => (
              <IngredientContent
                key={item?._id}
                ingredient={item}
                image={item.image}
                price={item.price}
                name={item.name}
              />
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text text_type_main-medium" id="sauce" ref={sauceRef}>
            Соусы
          </h3>
          <div className={`mt-6 ${styles.itemcontent}`}>
            {filteredIngredientsType("sauce").map((item) => (
              <IngredientContent
                key={item?._id}
                ingredient={item}
                image={item.image}
                price={item.price}
                name={item.name}
              />
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text text_type_main-medium" id="main" ref={mainRef}>
            Начинки
          </h3>
          <div className={`mt-6 ${styles.itemcontent}`}>
            {filteredIngredientsType("main").map((item) => (
              <IngredientContent
                key={item?._id}
                ingredient={item}
                image={item.image}
                price={item.price}
                name={item.name}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
