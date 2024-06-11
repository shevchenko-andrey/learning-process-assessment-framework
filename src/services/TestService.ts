import {
  Firestore,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where
} from "firebase/firestore";
import { auth, db } from "src/config/firebase";
import { Test } from "types/Test";

class TestService {
  private db: Firestore;

  constructor(db: Firestore) {
    this.db = db;
  }

  async createTest(test: Test) {
    const documentRef = doc(this.db, "tests");

    await setDoc(documentRef, {
      ...test,
      owner: auth.currentUser?.uid ?? ""
    });

    return test;
  }

  async updateTest(test: Test) {
    const documentRef = doc(this.db, "tests", test.id);
    await setDoc(documentRef, test);
  }
  async deleteTest(id: string) {
    const documentRef = doc(this.db, "tests", id);
    await deleteDoc(documentRef);
  }

  async getAllTests() {
    const testsRef = query(
      collection(this.db, "tests"),
      where("owner", "==", auth.currentUser?.uid)
    );
    const { docs } = await getDocs(testsRef);
    return docs.map((doc) => doc.data() as Test);
  }
}

export default new TestService(db);
