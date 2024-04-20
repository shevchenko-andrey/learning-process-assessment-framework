import { Firestore, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "src/config/firebase";
import { ApplicationRole } from "types/Auth";

interface ApplicationUser {
  id: string;
  email: string;
  role: ApplicationRole;
}

class UserService {
  private db: Firestore;

  constructor(db: Firestore) {
    this.db = db;
  }

  async getUserById(id: string | null) {
    if (id === null) return null;

    const documentRef = await doc(this.db, "users", id);

    const documentSnapshot = await getDoc(documentRef);

    return documentSnapshot.data() as ApplicationUser;
  }

  async createUser(user: ApplicationUser) {
    const documentRef = doc(this.db, "users", user.id);

    await setDoc(documentRef, user);

    return user;
  }
}

export default new UserService(db);
