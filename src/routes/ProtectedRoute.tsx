import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
