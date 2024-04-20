import { useAuth } from "hooks/useAuth";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { ApplicationRole } from "types/Auth";

interface RoleGuardProps {
  roles: ApplicationRole[];
  children: ReactNode;
}

const RoleGuard: React.FC<RoleGuardProps> = ({ roles, children }) => {
  const { role } = useAuth();

  if (!roles.includes(role)) return <Navigate to={"/users"} replace />;
  return children;
};

export default RoleGuard;
