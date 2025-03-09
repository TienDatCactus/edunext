import { replace } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import { User } from "../../utils/interfaces";

interface ProtectedRouteProps {
  user: User;
  allowedRoles: number[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  user,
  allowedRoles,
}) => {
  if (!user) {
    return <Navigate to="/auth/login" replace />; // Redirect to login if not authenticated
  }

  if (!allowedRoles.includes(Number(user?.role))) {
    return <Navigate to="/unauthorized" replace />; // Redirect if role is not allowed
  }

  return <Outlet />; // Render nested routes
};

export default ProtectedRoute;
