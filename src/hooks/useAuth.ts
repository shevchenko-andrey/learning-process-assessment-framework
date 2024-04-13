import { useContext } from "react";
import { AuthContext } from "src/providers/AuthProvider";

export const useAuth = () => {
  return useContext(AuthContext);
};
