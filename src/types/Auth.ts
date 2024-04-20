import { User } from "firebase/auth";
import { UserCredentials } from "./User";

export enum ApplicationRole {
  ADMIN = "admin",
  TEACHER = "teacher",
  STUDENT = "student"
}

export interface AuthStore {
  role: ApplicationRole;
  isLogin: boolean;
  currentUser: User | null;
  login: (credentials: UserCredentials) => void;
  register: (credentials: UserCredentials) => void;
  logout: () => void;
}

