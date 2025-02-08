import { doc, writeBatch } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";

export const saveMoviesService = async (userId, likedMovies) => {
  console.log(userId);
  console.log(likedMovies);
  if (!userId) {
    console.error("No user ID provided!");
    return;
  }

  try {
    if (likedMovies && likedMovies.length > 0) {
      const batch = writeBatch(db);

      likedMovies.forEach((movie) => {
        const movieRef = doc(db, "users", userId, "likedMovies", movie.imdbID);
        batch.set(movieRef, movie);
      });

      await batch.commit();
      toast.success("Movies saved successfully!");
      console.log("Movies saved!");
    }
  } catch (error) {
    console.error("Error saving movies:", error);
    toast.error("Failed to save movies.");
  }
};
