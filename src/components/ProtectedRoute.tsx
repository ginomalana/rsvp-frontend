import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { useCurrentUser } from "../hooks/CurrentUserContext";

const ProtectedRoute = () => {
  const { user } = useCurrentUser();
  return user ? <Outlet /> : <Navigate to={ROUTES.EVENT.PUBLIC_EVENTS} />;
};

export default ProtectedRoute;
