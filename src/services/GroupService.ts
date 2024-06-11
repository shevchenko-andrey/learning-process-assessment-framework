import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  or,
  query,
  updateDoc,
  where
} from "firebase/firestore";
import { auth, db } from "src/config/firebase";
import { Group } from "types/Group";
import { Test } from "types/Test";
import { ApplicationUser } from "types/User";
import UserService from "./UserService";

class GroupService {
  private db: Firestore;

  constructor(db: Firestore) {
    this.db = db;
  }

  async getGroupById(groupId: string) {
    const groupRef = doc(this.db, "groups", groupId);
    const group = await getDoc(groupRef);
    return { ...group.data(), id: group.id } as Group;
  }

  async createGroup(group: Group) {
    const collectionRef = collection(this.db, "groups");

    await addDoc(collectionRef, { ...group, owner: auth.currentUser?.uid });
  }

  async updateGroup(group: Group) {
    const documentRef = doc(this.db, "groups", group.id);
    await updateDoc(documentRef, group);
  }
  async deleteGroup(id: string) {
    const documentRef = doc(this.db, "groups", id);
    await deleteDoc(documentRef);
  }

  async getAllUserGroups(userId = auth.currentUser?.uid) {
    if (!userId) return [];

    const q = query(
      collection(this.db, "groups"),
      or(
        where("owner", "==", userId),
        where("members", "array-contains", userId)
      )
    );

    const { docs } = await getDocs(q);

    return docs.map((doc) => {
      return { ...doc.data(), id: doc.id } as Group;
    });
  }
  async getAllGroupMembers(groupId: string) {
    if (!groupId) return [];

    const group = await this.getGroupById(groupId);

    const usersRef = collection(this.db, "users");

    if (group.members.length === 0) return [];

    const q = query(usersRef, where("id", "in", group.members));

    const { docs } = await getDocs(q);

    return docs.map((doc) => {
      return { ...doc.data(), id: doc.id } as ApplicationUser;
    });
  }

  async addMemberToGroup(groupId: string, studentId: string) {
    const groupRef = doc(this.db, "/groups", groupId);
    const group = await this.getGroupById(groupId);

    if (group.members.includes(studentId)) return;

    await updateDoc(groupRef, { members: [...group.members, studentId] });
    await UserService.updateUserGroups(auth.currentUser?.uid ?? "", groupId);
  }

  async removeMemberFromGroup(groupId: string, studentId: string) {
    const groupRef = doc(this.db, "/groups", groupId);
    const group = await this.getGroupById(groupId);

    if (!group.members.includes(studentId)) return;

    const newMembers = group.members.filter((member) => member !== studentId);
    await updateDoc(groupRef, { members: newMembers });
    await UserService.removeUserFromGroup(auth.currentUser?.uid ?? "", groupId);
  }

  async assignTest({ groupId, testId }: { groupId: string; testId: string }) {
    const testsRef = collection(this.db, "groups", groupId, "tests");
    await addDoc(testsRef, { testId });
  }

  async unassignTest({ groupId, testId }: { groupId: string; testId: string }) {
    const testsRef = collection(this.db, "groups", groupId, "tests");
    await deleteDoc(doc(testsRef, testId));
  }

  async getAllGroupTests(groupId: string) {
    const groupTestsRef = collection(this.db, "groups", groupId, "tests");

    const { docs: groupTests } = await getDocs(groupTestsRef);

    if (groupTests.length === 0) return [];

    const testsIds = groupTests.map((doc) => {
      return doc.data()?.testId ?? "";
    });

    const q = query(collection(this.db, "tests"), where("id", "in", testsIds));

    const { docs: testsDocs } = await getDocs(q);

    return testsDocs.map((doc) => {
      return { ...doc.data(), id: doc.id } as Test;
    });
  }
  async getAllAvailableToJoinGroups() {
    const groupsRef = collection(this.db, "groups");
    const user = await UserService.getUserById(auth.currentUser?.uid ?? "");
    if (!user) return [];
    const userGroups = user.groups ?? [];

    if (userGroups.length === 0) {
      const { docs } = await getDocs(groupsRef);
      return docs.map((doc) => {
        return { ...doc.data(), id: doc.id } as Group;
      });
    }

    const q = query(groupsRef, where("id", "not-in", userGroups));
    const { docs } = await getDocs(q);
    return docs.map((doc) => {
      return { ...doc.data(), id: doc.id } as Group;
    });
  }
}

export default new GroupService(db);
