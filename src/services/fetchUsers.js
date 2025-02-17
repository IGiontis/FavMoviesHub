import { db } from "../firebase/firebaseConfig";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

/**
 * Fetch users from Firestore excluding the current user.
 * @param {string} searchTerm - The username search term.
 * @param {string} currentUserId - The ID of the logged-in user.
 * @returns {Promise<Array>} - List of users.
 */
export const fetchUsers = async (searchTerm, currentUserId) => {
  if (!searchTerm.trim()) return [];

  const usersRef = collection(db, "users");

  // Query users matching the searchTerm and exclude the current user
  const q = query(
    usersRef,
    where("username", ">=", searchTerm),
    where("username", "<=", searchTerm + "\uf8ff"),
    orderBy("username")
  );

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .filter((user) => user.id !== currentUserId); // Exclude current user
};
