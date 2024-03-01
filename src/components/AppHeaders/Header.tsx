import { NavLink, useLocation } from "react-router-dom";
import styles from "./Header.module.scss";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";

export const Header = () => {
  const [pathname, setPathname] = useState("");

  const location = useLocation();
  useEffect(() => {
    setPathname(location.pathname);
  }, [location]);

  return (
    <header className="pb-4 pt-4">
      <nav className={styles.nav}>
        <div className={`mr-30 ${styles.navigation}`}>
          <NavLink
            to="/"
            className={`pt-4 pb-4 pl-5 pr-5 ${styles.content} text text_type_main-default`}
          >
            <BurgerIcon
              type={`${pathname === "/" ? "primary" : "secondary"}`}
            />
            <p
              className={`${
                pathname === "/"
                  ? "text text_type_main-default"
                  : "text_color_inactive"
              }`}
            >
              Конструктор
            </p>
          </NavLink>

          <NavLink
            to="/feed"
            className={`pt-4 pb-4 pl-5 pr-5 ${styles.content} text text_type_main-default`}
          >
            <ListIcon
              type={`${pathname === "/feed" ? "primary" : "secondary"}`}
            />
            <p
              className={`${
                pathname === "/feed"
                  ? "text text_type_main-default"
                  : "text_color_inactive"
              }`}
            >
              Лента заказов
            </p>
          </NavLink>
        </div>

        <NavLink to="/" className={styles.logo}>
          <Logo />
        </NavLink>

        <NavLink
          to="/profile"
          className={`pt-4 pb-4 pl-5 pr-5 ${styles.content} text text_type_main-default`}
        >
          <ProfileIcon
            type={`${
              pathname === "/profile" || pathname === "/profile/orders"
                ? "primary"
                : "secondary"
            }`}
          />
          <p
            className={`${
              pathname === "/profile" || pathname === "/profile/orders"
                ? "text text_type_main-default"
                : "text_color_inactive"
            }`}
          >
            Личный кабинет
          </p>
        </NavLink>
      </nav>
    </header>
  );
};
