import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { UserCredentials } from "types/User";
import { auth } from "../config/firebase";

class AuthService {
  private auth: Auth;

  constructor(auth: Auth) {
    this.auth = auth;
  }

  async register(credentials: UserCredentials) {
    return createUserWithEmailAndPassword(
      this.auth,
      credentials.email,
      credentials.password
    );
  }

  async login(credentials: UserCredentials) {
    return signInWithEmailAndPassword(
      this.auth,
      credentials.email,
      credentials.password
    );
  }

  async logout() {
    await signOut(this.auth);
  }
}
export default new AuthService(auth);
