import { useState } from "react";
import styles from "./Header.module.scss";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const Header = () => {
  return (
    <header className="pb-4 pt-4">
      <nav className={styles.nav}>
        <div className={`mr-30 ${styles.navigation}`}>
          <div
            className={`pt-4 pb-4 pl-5 pr-5 ${styles.content} text text_type_main-default`}
          >
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default">Конструктор</p>
          </div>
          <div
            className={`pt-4 pb-4 pl-5 pr-5 ${styles.content} text text_type_main-default`}
          >
            <ListIcon type="secondary" />
            <p className="text text_type_main-default">Лента заказов</p>
          </div>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div
          className={`pt-4 pb-4 pl-5 pr-5 ${styles.content} text text_type_main-default`}
        >
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default">Личный кабинет</p>
        </div>
      </nav>
    </header>
  );
};
