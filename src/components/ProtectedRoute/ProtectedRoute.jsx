import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getIsLoading, getIsLoggedIn } from "../../services/reducers";

function ProtectedRoute({ element: Component, onlyUnAuth = false, ...props }) {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const isLoading = useSelector(getIsLoading);
  const location = useLocation();

  if (isLoading === true) {
    return (
      <p className="mt-15 text text_type_main-large mb-15">
        Информация летит из космоса...
      </p>
    );
  }

  if (
    location.pathname === "/reset-password" &&
    !location.state?.fromForgotPassword
  ) {
    return <Navigate to="/" />;
  }

  if (onlyUnAuth && isLoggedIn) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} state={{ from: location }} />;
  }

  if (!onlyUnAuth && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Component {...props} />;
}

export default ProtectedRoute;
