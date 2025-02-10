import { collection, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const addLikedMovieToDB = async (userID, movie) => {
  if (!userID || !movie) throw new Error("Invalid userID or movie");

  const movieRef = doc(collection(db, "users", userID, "likedMovies"), movie.imdbID);
  await setDoc(movieRef, movie);
};

export const removeLikedMovieFromDB = async (userID, movieID) => {
  if (!userID || !movieID) throw new Error("Invalid userID or movieID");

  const movieRef = doc(db, "users", userID, "likedMovies", movieID);
  await deleteDoc(movieRef);
};
