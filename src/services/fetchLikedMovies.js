import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { setLikedMovies } from "../redux/likedMoviesSlice";

export const fetchLikedMovies = async (userID, dispatch) => {
  if (!userID) return;

  try {
    const moviesRef = collection(db, "users", userID, "likedMovies");
    const snapshot = await getDocs(moviesRef);

    const movies = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    dispatch(setLikedMovies(movies));
  } catch (error) {
    console.error("Error fetching liked movies:", error);
  }
};
