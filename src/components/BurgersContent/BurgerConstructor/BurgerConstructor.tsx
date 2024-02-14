import { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  addIngredient,
  deleteIngredient,
  updateTotalPrice,
} from "../../../services/actions/BurgerConstructor";
import { ConstructorContent } from "./ConstructorContent/ConstructorContent";
import { Modal } from "../../Modals/Modal/Modal";
import styles from "./BurgerConstructor.module.scss";
import { useModal } from "../../../hooks/useModal";
import { OrderDetails } from "../../Modals/OrderDetails/OrderDetails";
import { requestApi } from "../../../utils/request";
import { getOrder } from "../../../services/actions/Order";
import {
  getBurgerConstructorIngredients,
  getIsLoggedIn,
  getTotalPice,
} from "../../../services/reducers";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "../../../utils/typeHooks";
import { TIngredientObj } from "../../../utils/types";

type TIngredientObjConstructor = TIngredientObj & {
  readonly uniqId: string;
};

export const BurgerConstructor = () => {
  const { isModalOpen, openModal, closeModal } = useModal();

  const [ingredientBun, setIngredientBun] =
    useState<TIngredientObjConstructor | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalPrice = useSelector(getTotalPice);
  const isLoggedIn = useSelector(getIsLoggedIn);
  const ingredientsConstructor: Array<TIngredientObjConstructor> = useSelector(
    getBurgerConstructorIngredients
  );

  const classButton =
    ingredientsConstructor.length < 1 ? styles.buttonDisabled : "";

  useEffect(() => {
    ingredientsConstructor.map((item) => {
      if (item.type === "bun") {
        setIngredientBun(item);
      }
    });
  }, [ingredientsConstructor]);

  const clickOrderButton = () => {
    openModal();
    if (isLoggedIn) {
      const ingredientsOrderId = [...ingredientsConstructor].map((item) => {
        return item._id;
      });
      const IngredientId = {
        ingredients: ingredientsOrderId,
      };
      dispatch(getOrder(requestApi, IngredientId));
    } else {
      navigate("/login");
    }
  };

  function onDeleteIngredient(uniqId: string) {
    dispatch(deleteIngredient(uniqId));
    dispatch(updateTotalPrice());
  }

  const [{ isHover }, drop] = useDrop({
    accept: "ingredient",
    drop(ingredient: TIngredientObjConstructor) {
      if (ingredient.type === "bun") {
        ingredientsConstructor.some((item) => {
          if (item.type === "bun") {
            dispatch(deleteIngredient(item.uniqId));
          }
        });
      }
      dispatch(addIngredient(ingredient));
      dispatch(updateTotalPrice());
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const backgroundopacity = isHover ? styles.backgroundopacity : "";

  return (
    <section className={`mt-25 ${styles.burgerconstructor}`}>
      <div className={backgroundopacity} ref={drop}>
        {ingredientsConstructor.length > 0 ? (
          <div className={styles.constructorcontent}>
            {ingredientBun && (
              <div className={styles.item}>
                <ConstructorElement
                  type="top"
                  text={`${ingredientBun?.name} (верх)`}
                  price={ingredientBun?.price}
                  thumbnail={ingredientBun.image}
                  isLocked={true}
                />
              </div>
            )}

            <div className={styles.constructorcontent}>
              {ingredientsConstructor.map((item, index) => {
                if (item.type === "main" || item.type === "sauce") {
                  return (
                    <ConstructorContent index={index} key={item.uniqId}>
                      <div className={styles.item}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                          key={item.uniqId}
                          text={item.name}
                          price={item.price}
                          thumbnail={item.image}
                          handleClose={() => onDeleteIngredient(item.uniqId)}
                        />
                      </div>
                    </ConstructorContent>
                  );
                }
              })}
            </div>

            {ingredientBun && (
              <ConstructorElement
                key={ingredientBun.uniqId}
                type="bottom"
                isLocked={true}
                text={`${ingredientBun.name} (низ)`}
                price={ingredientBun.price}
                thumbnail={ingredientBun.image}
              />
            )}
          </div>
        ) : (
          <div className={styles.constructorfirst}>
            <p className="text">
              Перетащите ингредиенты и булки для составления бургера
            </p>
          </div>
        )}
        <div className={`mt-10 ${styles.offer}`}>
          <p className={`text text_type_digits-medium ${styles.price}`}>
            {totalPrice} <CurrencyIcon type="primary" />
          </p>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            extraClass={classButton}
            onClick={clickOrderButton}
            disabled={!ingredientBun}
          >
            Оформить заказ
          </Button>
        </div>
      </div>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};
