import { db } from "../../firebase/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

export const deleteUserComment = async (userID, movieID) => {
  if (!userID || !movieID) {
    throw new Error("Missing userID or movieID in deleteUserComment");
  }

  try {
    const commentRef = doc(db, "users", userID, "movieComments", movieID);
    await deleteDoc(commentRef);
  } catch (error) {
    console.error(" Failed to delete comment:", error);
    throw error;
  }
};
