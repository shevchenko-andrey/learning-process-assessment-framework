import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc
} from "firebase/firestore";
import { db } from "src/config/firebase";
import { ApplicationUser } from "types/User";

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

  async updateUser(user: ApplicationUser) { 
    const documentRef = doc(this.db, "users", user.id);
    await setDoc(documentRef, user);
  }

  async getAllUsers() {
    const documentRef = collection(this.db, "users");

    const { docs } = await getDocs(documentRef);

    return docs.map((doc) => doc.data() as ApplicationUser);
  }
}

export default new UserService(db);
