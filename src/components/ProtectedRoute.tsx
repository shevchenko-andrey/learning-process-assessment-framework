import { useAuth } from "hooks/useAuth";
import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { isLogin } = useAuth();

  if (!isLogin) {
    return <Navigate to='/login' replace />;
  }
  return children;
};

export default ProtectedRoute;
