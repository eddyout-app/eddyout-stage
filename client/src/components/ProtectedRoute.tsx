import { Navigate } from "react-router-dom";
import Auth from "../utils/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  return Auth.loggedIn() ? <>{children}</> : <Navigate to="/" replace />;
}
