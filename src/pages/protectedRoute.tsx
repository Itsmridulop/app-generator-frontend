import { ReactNode } from "react";
import { auth } from "../api/authApi";
import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const user = useUser();
  console.log(user);
  if (!auth.isAuthenticated() || !user.user)
    return <Navigate to="/login" replace={true} />;
  return children;
}

export default ProtectedRoute;
