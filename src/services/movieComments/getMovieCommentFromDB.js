// services/addCommentMovie.js
import {  doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

export const getMovieCommentFromDB = async (userID, movieID) => {
 
  const movieCommentDoc = doc(db, "users", userID, "movieComments", movieID);
  const docSnap = await getDoc(movieCommentDoc);

  if (docSnap.exists()) {
    return docSnap.data().comment;
  } else {
    return null;  // If no comment exists for this user and movie
  }
};
