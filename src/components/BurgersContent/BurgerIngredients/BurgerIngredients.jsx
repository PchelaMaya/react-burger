import { Tabs } from "./Tabs/Tabs";
import styles from "./BurgerIngredients.module.scss";
import { IngredientContent } from "./IngredientsContent/IngredientContent";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../../utils/types";

export const BurgerIngredients = (props) => {
  const bunsData = props.data?.filter((bun) => bun.type === "bun") || [];
  const sauceData = props.data?.filter((sauce) => sauce.type === "sauce") || [];
  const flavoursData =
    props.data?.filter((flavour) => flavour.type === "main") || [];

  return (
    <section className={`mt-10 ${styles.burgeringredients}`}>
      <h2 className="text text_type_main-large">Соберите бургер</h2>
      <Tabs />
      <div className={`mt-10 custom-scroll ${styles.ingredientsitem}`}>
        <div className="mb-10">
          <h3 className="text text_type_main-medium" id="bun">
            Булки
          </h3>
          <div className={`mt-6 ${styles.itemcontent}`}>
            {bunsData.map((buns) => (
              <IngredientContent data={buns} key={buns?._id} />
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text text_type_main-medium" id="sauce">
            Соусы
          </h3>
          <div className={`mt-6 ${styles.itemcontent}`}>
            {sauceData.map((sauce) => (
              <IngredientContent data={sauce} key={sauce?._id} />
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text text_type_main-medium" id="main">
            Начинки
          </h3>
          <div className={`mt-6 ${styles.itemcontent}`}>
            {flavoursData.map((flavour) => (
              <IngredientContent data={flavour} key={flavour?._id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
};
