import styles from "./IngredientItem.module.scss";

type TPropsIngredientItem = {
  link?: string;
  last?: boolean;
  count?: number;
};

export const IngredientItem = ({ link, last, count }: TPropsIngredientItem) => {
  return (
    <div className={`${styles.container}`}>
      {count !== undefined && last === true ? (
        <>
          <p className={`text text_type_digits-default ${styles.count}`}>
            +{count}
          </p>
          <img className={`${styles.image}`} src={link} alt="лого" />
        </>
      ) : (
        <img className={`${styles.image}`} src={link} alt="лого" />
      )}
    </div>
  );
};
