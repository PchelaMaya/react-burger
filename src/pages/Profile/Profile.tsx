import { useEffect, useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import styles from "./Profile.module.scss";
import { logoutUser } from "../../services/actions/CurrentUser";
import { useAppDispatch } from "../../utils/typeHooks";

export const Profile = () => {
  const [pathname, setPathname] = useState("");
  const dispatch = useAppDispatch();

  function handleClick(e: React.SyntheticEvent) {
    e.preventDefault();

    dispatch(logoutUser());
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
          className="text text_type_main-medium text_color_inactive mb-20"
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
