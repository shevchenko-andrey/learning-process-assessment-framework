import {
  PropsWithChildren,
  createContext,
  useEffect,
  useRef,
  useState
} from "react";
import { User } from "types/User";

type AuthStore = {
  isLogin: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

const defaultValue: AuthStore = {
  isLogin: false,
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (_user: User) => {},
  logout: () => {}
};

export const AuthContext = createContext(defaultValue);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const isFirstRender = useRef(true);

  const login = (user: User) => {
    setIsLogin(true);
    setUser(user);
  };
  const logout = () => {
    setIsLogin(false);
    setUser(null);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      login(JSON.parse(user));
      setIsLogin(true);
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ isLogin, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
