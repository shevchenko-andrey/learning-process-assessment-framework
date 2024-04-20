import { useAuth } from "hooks/useAuth";
import { ReactNode } from "react";
import { ApplicationRole } from "types/Auth";

interface ProtectedContentProps {
  roles: ApplicationRole[];
  children: ReactNode;
}

const ProtectedContent: React.FC<ProtectedContentProps> = ({
  roles,
  children
}) => {
  const { role } = useAuth();

  if (!roles.includes(role)) return;
  return children;
};

export default ProtectedContent;
