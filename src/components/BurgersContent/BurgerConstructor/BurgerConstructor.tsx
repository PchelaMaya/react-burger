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
  getOrderLoading,
  getTotalPrice,
} from "../../../services/reducers";
import { useNavigate } from "react-router";
import { useAppDispatch, useSelector } from "../../../utils/typeHooks";
import { TIngredientObjConstructor } from "../../../utils/types";
import { nanoid } from "@reduxjs/toolkit";

export const BurgerConstructor = () => {
  const { isModalOpen, openModal, closeModal } = useModal();

  const [ingredientBun, setIngredientBun] =
    useState<TIngredientObjConstructor | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const totalPrice = useSelector(getTotalPrice);
  const isLoggedIn = useSelector(getIsLoggedIn);
  const orderIsLoading = useSelector(getOrderLoading);
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
      const ingredientsId = {
        ingredients: ingredientsOrderId,
      };
      dispatch(getOrder(requestApi, ingredientsId));
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
      dispatch(addIngredient(ingredient, nanoid()));
      dispatch(updateTotalPrice());
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  return (
    <section className={`mt-25 ${styles.burgerconstructor}`}>
      <div ref={drop} data-test="constructor-content">
        {ingredientsConstructor.length > 0 ? (
          <div className={styles.constructorcontent}>
            {ingredientBun && (
              <div className={styles.item} data-test="content-bun-top">
                <ConstructorElement
                  type="top"
                  text={`${ingredientBun?.name} (верх)`}
                  price={ingredientBun?.price}
                  thumbnail={ingredientBun.image}
                  isLocked={true}
                />
              </div>
            )}

            <div className={styles.constructorcontent} data-test="content-main">
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
              <div data-test="content-bun-bottom">
                <ConstructorElement
                  key={ingredientBun.uniqId}
                  type="bottom"
                  isLocked={true}
                  text={`${ingredientBun.name} (низ)`}
                  price={ingredientBun.price}
                  thumbnail={ingredientBun.image}
                />
              </div>
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
            disabled={ingredientsConstructor.length < 1 || orderIsLoading}
            data-test="btn-order"
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
