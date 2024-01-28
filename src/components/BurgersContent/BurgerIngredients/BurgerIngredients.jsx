import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs } from "./Tabs/Tabs";
import { IngredientContent } from "./IngredientsContent/IngredientContent";
import { addIngredientPopup } from "../../../services/actions/IngredientDetails";
import styles from "./BurgerIngredients.module.scss";

export const BurgerIngredients = () => {
  const [current, setCurrent] = useState("Булки");
  const dispatch = useDispatch();

  const openIngredientPopup = (ingredient) => {
    dispatch(addIngredientPopup(ingredient));
  };

  const ingredients = useSelector((state) => state.ingredients.ingredients);

  const containerRef = useRef(null);

  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    handleScroll();
    containerRef.current.addEventListener("scroll", handleScroll);

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  function handleScroll() {
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

    const closestDistance = Math.min(bunDistance, mainDistance, sauceDistance);

    if (closestDistance === bunDistance) {
      setCurrent("Булки");
    } else if (closestDistance === mainDistance) {
      setCurrent("Начинки");
    } else if (closestDistance === sauceDistance) {
      setCurrent("Соусы");
    }
  }

  const filteredIngredientsType = (type) => {
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
                ingredientClick={openIngredientPopup}
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
                ingredientClick={openIngredientPopup}
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
                ingredientClick={openIngredientPopup}
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
