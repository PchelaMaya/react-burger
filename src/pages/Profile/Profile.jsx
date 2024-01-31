import { useEffect, useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import styles from "./Profile.module.scss";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../services/actions/CurrentUser";

export const Profile = () => {
  const [pathname, setPathname] = useState("");
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();

    const refreshToken = localStorage.getItem("refreshToken");
    dispatch(logoutUser(refreshToken));
  }
  const location = useLocation();
  useEffect(() => {
    setPathname(location.pathname);
  }, [location]);

  return (
    <div className={styles.profile}>
      <div className={styles.profilenavigation}>
        <NavLink
          to="/profile"
          className={`text text_type_main-medium ${
            pathname !== "/profile" && "text_color_inactive"
          }`}
        >
          Профиль
        </NavLink>
        <NavLink
          to="/profile/orders"
          className={`text text_type_main-medium ${
            pathname !== "/profile/orders" && "text_color_inactive"
          }`}
        >
          История заказов
        </NavLink>
        <NavLink
          className="text text_type_main-medium mb-20"
          to="/login"
          onClick={handleClick}
        >
          Выход
        </NavLink>

        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>

      <Outlet />
    </div>
  );
};
