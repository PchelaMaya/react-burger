import { Navigate, useLocation } from "react-router-dom";
import { getIsLoading, getIsLoggedIn } from "../../services/reducers";
import { ReactElement, ReactNode, useMemo } from "react";
import { useSelector } from "../../utils/typeHooks";

interface IProtectedRouteProps {
  onlyUnAuth?: boolean;
  element: ReactElement;
}

function ProtectedRoute({ element, onlyUnAuth = false }: IProtectedRouteProps) {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const isLoading = useSelector(getIsLoading);
  const location = useLocation();

  const from = useMemo(() => {
    if (location.state !== null && location.state.from !== undefined) {
      return location.state.from.pathname;
    }
    return "/";
  }, [location.state]);

  if (isLoading) {
    return (
      <p className="mt-15 text text_type_main-large mb-15">
        Информация летит из космоса...
      </p>
    );
  }

  if (onlyUnAuth && isLoggedIn) {
    return <Navigate to={from} state={{ from: location }} />;
  }

  if (!onlyUnAuth && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return element;
}

export default ProtectedRoute;
