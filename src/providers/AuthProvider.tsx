import { User, onAuthStateChanged } from "firebase/auth";
import React, { PropsWithChildren, useEffect, useState } from "react";
import AuthService from "services/AuthService";
import UserService from "services/UserService";
import { ApplicationRole, AuthStore } from "types/Auth";
import { UserCredentials } from "types/User";
import { auth } from "../config/firebase";

export const AuthContext = React.createContext({} as AuthStore);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [role, setRole] = useState<ApplicationRole>(ApplicationRole.STUDENT);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const register = async (credentials: UserCredentials) => {
    const { user } = await AuthService.register(credentials);
    await UserService.createUser({
      id: user.uid,
      email: user.email ?? "",
      role: ApplicationRole.STUDENT,
      groups: []
    });
  };

  const login = (credentials: UserCredentials) => {
    return AuthService.login(credentials);
  };

  const logout = () => {
    return AuthService.logout();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const foundedUser = await UserService.getUserById(user?.uid ?? null);

      const role = foundedUser ? foundedUser.role : ApplicationRole.STUDENT;

      setRole(role);
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    role,
    isLogin: currentUser !== null,
    currentUser,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
