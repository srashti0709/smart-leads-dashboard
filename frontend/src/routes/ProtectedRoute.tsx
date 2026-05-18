import { Navigate } from "react-router-dom";
import { getToken } from "../utils/token";

export default function ProtectedRoute({ children }: any) {
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}