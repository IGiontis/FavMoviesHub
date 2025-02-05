// services/firebase.js
import { db } from "./firebaseConfig";
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";

// Toggle the favorite movie for a user
export const toggleFavorite = async (userId, movieId) => {
  const userRef = doc(db, "users", userId);

  console.log(userRef);
  console.log(userId);
  console.log(movieId);
  try {
    // Get current user data (to check if movie already exists)
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const likedMovies = userData.likedMovies || [];

      // If the movie is already liked, remove it; else, add it
      const updatedMovies = likedMovies.includes(movieId)
        ? arrayRemove(movieId)
        : arrayUnion(movieId);

      // Update liked movies in the database
      await updateDoc(userRef, {
        likedMovies: updatedMovies,
      });
    }
  } catch (error) {
    console.error("Error updating favorite movie:", error);
  }
};
