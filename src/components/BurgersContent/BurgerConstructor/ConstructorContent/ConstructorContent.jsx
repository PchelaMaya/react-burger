import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ConstructorContent.module.scss";

const ingredientsData = [
  {
    id: 1,
    name: "Соус традиционный галактический",
    price: 30,
    thumbnail: "https://code.s3.yandex.net/react/code/sauce-03.png",
  },
  {
    id: 2,
    name: "Мясо бессмертных моллюсков Protostomia",
    price: 300,
    thumbnail: "https://code.s3.yandex.net/react/code/meat-02.png",
  },
  {
    id: 3,
    name: "Плоды Фалленианского дерева",
    price: 80,
    thumbnail: "https://code.s3.yandex.net/react/code/sp_1.png",
  },
  {
    id: 4,
    name: "Хрустящие минеральные кольца",
    price: 80,
    thumbnail: "https://code.s3.yandex.net/react/code/mineral_rings.png",
  },
  {
    id: 5,
    name: "Соус традиционный галактический",
    price: 30,
    thumbnail: "https://code.s3.yandex.net/react/code/sauce-03.png",
  },
  {
    id: 6,
    name: "Мясо бессмертных моллюсков Protostomia",
    price: 300,
    thumbnail: "https://code.s3.yandex.net/react/code/meat-02.png",
  },
  {
    id: 7,
    name: "Плоды Фалленианского дерева",
    price: 80,
    thumbnail: "https://code.s3.yandex.net/react/code/sp_1.png",
  },
  {
    id: 8,
    name: "Хрустящие минеральные кольца",
    price: 80,
    thumbnail: "https://code.s3.yandex.net/react/code/mineral_rings.png",
  },
];

export const ConstructorContent = () => {
  return (
    <div className={`mt-4 mb-4 custom-scroll ${styles.constructorcontent}`}>
      {ingredientsData.map((ingredient) => (
        <div key={ingredient.id} className={styles.item}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.thumbnail}
          />
        </div>
      ))}
      <div key={ingredientsData[3].id} className={styles.item}>
        <DragIcon type="primary" />
        <ConstructorElement
          text={ingredientsData[3].name}
          price={ingredientsData[3].price}
          thumbnail={ingredientsData[3].thumbnail}
        />
      </div>
    </div>
  );
};
