import { Header } from "../AppHeaders/Header";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Login } from "../../pages/Login/Login";
import { Register } from "../../pages/Register/Register";
import { Home } from "../../pages/Home/Home";
import { ResetPassword } from "../../pages/ResetPassword/ResetPassword";
import { ForgotPassword } from "../../pages/ForgotPassword/ForgotPassword";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { getUser } from "../../services/actions/CurrentUser";
import { useEffect, useState } from "react";
import { Profile } from "../../pages/Profile/Profile";
import { ProfileForm } from "../../pages/Profile/ProfileForm";
import { IngredientModal } from "../../pages/IngredientModal/IngredientModal";
import { closeIngredientPopup } from "../../services/actions/IngredientDetails";
import { closeOrderPopup } from "../../services/actions/Order";
import { getIngredients } from "../../services/actions/Ingredients";
import { IngredientDetails } from "../Modals/IngredientDetails/IngredientDetails";
import { useDispatch } from "../../utils/typeHooks";
import { requestApi } from "../../utils/request";
import { Feed } from "../../pages/Feed/Feed";
import { OrderFeed } from "../OrderFeed/OrderFeed";
import { FeedDetails } from "../Modals/FeedDetails/FeedDetails";
import { ProfileOrders } from "../../pages/Profile/ProfileOrders";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(location.pathname);
  }, [location]);

  const closePopup = () => {
    dispatch(closeIngredientPopup());
    dispatch(closeOrderPopup());
    navigate(-1);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(getUser());
    }
    dispatch(getIngredients(requestApi));
  }, [dispatch, requestApi]);

  const background = location.state && location.state.background;

  return (
    <>
      <div>
        <Header />
        <Routes location={background || location}>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<ProtectedRoute element={<Login />} onlyUnAuth />}
          />
          <Route
            path="/register"
            element={<ProtectedRoute element={<Register />} onlyUnAuth />}
          />
          <Route
            path="/reset-password"
            element={<ProtectedRoute element={<ResetPassword />} onlyUnAuth />}
          />
          <Route
            path="/forgot-password"
            element={<ProtectedRoute element={<ForgotPassword />} onlyUnAuth />}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute element={<Profile />} />}
          >
            <Route
              index
              element={<ProtectedRoute element={<ProfileForm />} />}
            />
            <Route
              path="orders"
              element={<ProtectedRoute element={<ProfileOrders />} />}
            />
            <Route
              path=":number"
              element={<ProtectedRoute element={<OrderFeed />} />}
            />
          </Route>
          <Route path="/ingredient/:id" element={<IngredientDetails />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/feed/:number" element={<OrderFeed />} />
        </Routes>
        <Routes>
          {background && (
            <Route
              path="/ingredient/:id"
              element={<IngredientModal onClose={closePopup} />}
            />
          )}
          {background && (
            <Route
              path="/feed/:number"
              element={<FeedDetails onClose={closePopup} />}
            />
          )}
          {background && pathname === "/profile/*" && (
            <Route
              path="/profile/orders/:id"
              element={
                <ProtectedRoute
                  element={<FeedDetails onClose={closePopup} />}
                  onlyUnAuth
                />
              }
            />
          )}
        </Routes>
      </div>
    </>
  );
}

export default App;
