import {
  Firestore,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc
} from "firebase/firestore";
import { db } from "src/config/firebase";
import { Test } from "types/Test";

class TestService {
  private db: Firestore;

  constructor(db: Firestore) {
    this.db = db;
  }

  async createTest(test: Test) {
    const documentRef = doc(this.db, "tests");

    await setDoc(documentRef, test);

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
    const documentRef = collection(this.db, "tests");

    const { docs } = await getDocs(documentRef);

    return docs.map((doc) => doc.data() as Test);
  }
}

export default new TestService(db);
