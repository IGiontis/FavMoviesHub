import { db } from "../firebase/firebaseConfig";

import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

export const fetchUsers = async (searchTerm) => {
  if (!searchTerm.trim()) return [];

  const usersRef = collection(db, "users");

  // Ensure Firestore indexing for "username"
  const q = query(
    usersRef,
    where("username", ">=", searchTerm),
    where("username", "<=", searchTerm + "\uf8ff"),
    orderBy("username") // 🔥 Ensure ordering for range queries
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
