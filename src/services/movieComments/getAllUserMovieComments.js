import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

/**
 * Fetch all movie comments for a user from Firestore.
 * @param {string} userID - The ID of the user.
 * @returns {Promise<Object>} - An object where keys are movie IDs and values are comments.
 */
export const getAllUserMovieComments = async (userID) => {
  if (!userID) throw new Error("Missing userID");

  console.log("how many times")
  const userRef = collection(db, "users", userID, "movieComments");
  const snapshot = await getDocs(userRef);

  const comments = {};
  snapshot.forEach((doc) => {
    comments[doc.id] = doc.data().comment; // doc.id is the movieID
  });

  return comments;
};
