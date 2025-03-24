import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

//  Fetch a username from Firestore
export const fetchUsername = async (userId) => {
  if (!userId) return "Unknown User";
  const userDoc = await getDoc(doc(db, "users", userId));
  return userDoc.exists() ? userDoc.data().username : "Unknown User";
};
