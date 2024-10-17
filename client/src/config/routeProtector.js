import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  const user = currentUser;
  return user ? <Outlet /> : <Navigate to="/auth" />;
};

export default ProtectedRoute;
