import {
  DocumentData,
  Firestore,
  Query,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where
} from "firebase/firestore";
import { db } from "src/config/firebase";
import { ApplicationRole } from "types/Auth";
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
    await updateDoc(documentRef, user);
  }

  async updateUserGroups(userId: string, groupId: string) { 
    const userRef = doc(this.db, "users", userId);
    const user = await getDoc(userRef);

    if (!user.exists()) return;

    const userGroups = user.data()?.groups ?? [];

    if (!userGroups.includes(groupId)) {
      userGroups.push(groupId);
    }

    await setDoc(userRef, { groups: userGroups });
  }
  async removeUserFromGroup(userId: string, groupId: string) { 
    const userRef = doc(this.db, "users", userId);
    const user = await getDoc(userRef);

    if (!user.exists()) return;

    const userGroups = user.data()?.groups ?? [];

    if (userGroups.includes(groupId)) {
      const index = userGroups.indexOf(groupId);
      userGroups.splice(index, 1);
    }

    await setDoc(userRef, { groups: userGroups });
  }

  async getAllUsers(filters?: { role?: ApplicationRole }) {
    let documentRef: Query<DocumentData, DocumentData>;

    switch (filters?.role) {
      case ApplicationRole.STUDENT: {
        documentRef = query(
          collection(this.db, "users"),
          where("role", "==", ApplicationRole.STUDENT)
        );
        break;
      }
      case ApplicationRole.TEACHER: {
        documentRef = query(
          collection(this.db, "users"),
          where("role", "==", ApplicationRole.TEACHER)
        );
        break;
      }
      case ApplicationRole.ADMIN: {
        documentRef = query(
          collection(this.db, "users"),
          where("role", "==", ApplicationRole.ADMIN)
        );
        break;
      }
      default: {
        documentRef = collection(this.db, "users");
      }
    }

    const { docs } = await getDocs(documentRef);

    return docs.map((doc) => doc.data() as ApplicationUser);
  }
}

export default new UserService(db);
