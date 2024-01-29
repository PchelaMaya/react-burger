import { Header } from "../AppHeaders/Header";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Login } from "../../pages/Login/Login";
import { Register } from "../../pages/Register/Register";
import { Home } from "../../pages/Home/Home";
import { ResetPassword } from "../../pages/ResetPassword/ResetPassword";
import { ForgotPassword } from "../../pages/ForgotPassword/ForgotPassword";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { useDispatch } from "react-redux";
import { getUser } from "../../services/actions/CurrentUser";
import { useEffect } from "react";
import { Profile } from "../../pages/Profile/Profile";
import { ProfileForm } from "../../pages/Profile/ProfileForm";
import { IngredientModal } from "../../pages/IngredientModal/IngredientModal";
import { closeIngredientPopup } from "../../services/actions/IngredientDetails";
import { closeOrderPopup } from "../../services/actions/Order";
import { getIngredients } from "../../services/actions/Ingredients";
import { requestApi } from "../../utils/request";
import { IngredientDetails } from "../Modals/IngredientDetails/IngredientDetails";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const closePopup = () => {
    dispatch(closeIngredientPopup());
    dispatch(closeOrderPopup());
    navigate(-1, { replace: true });
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
            element={<ProtectedRoute element={Login} onlyUnAuth />}
          />
          <Route
            path="/register"
            element={<ProtectedRoute element={Register} onlyUnAuth />}
          />
          <Route
            path="/reset-password"
            element={<ProtectedRoute element={ResetPassword} onlyUnAuth />}
          />
          <Route
            path="/forgot-password"
            element={<ProtectedRoute element={ForgotPassword} onlyUnAuth />}
          />
          <Route path="/profile" element={<ProtectedRoute element={Profile} />}>
            <Route index element={<ProtectedRoute element={ProfileForm} />} />
          </Route>
          <Route path="/ingredient/:id" element={<IngredientDetails />} />
          {/* <Route path=".*" element={<p>Страница отдыхает в космосе.</p>} /> */}
        </Routes>
        <Routes>
          {background && (
            <Route
              path="/ingredient/:id"
              element={<IngredientModal onClose={closePopup} />}
            />
          )}
        </Routes>
      </div>
    </>
  );
}

export default App;
