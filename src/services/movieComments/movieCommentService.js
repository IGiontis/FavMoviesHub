import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

/**
 * Save or update a user's movie comment in Firestore.
 * @param {string} userID - The ID of the user.
 * @param {string} movieID - The ID of the movie.
 * @param {string} comment - The comment text.
 */
export const saveUserMovieComment = async ({ userID, movieID, comment }) => {
  if (!userID || !movieID || !comment) throw new Error("Missing required parameters");

  const userRef = doc(db, "users", userID);
  const movieCommentsRef = collection(userRef, "movieComments");

  const newComment = {
    comment,
    timestamp: Timestamp.fromDate(new Date()),
  };

  await setDoc(doc(movieCommentsRef, movieID), newComment, { merge: true });
};
