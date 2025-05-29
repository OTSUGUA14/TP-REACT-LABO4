import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    children: ReactNode;
  }

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const rolUsuario = localStorage.getItem("rolUsuario");

  if (rolUsuario !== "ADMIN") {
    // Redirect to login or home if not admin
    return <Navigate to="/login" replace />;
  }

  return children;
}
