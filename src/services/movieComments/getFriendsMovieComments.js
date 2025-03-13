import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

/**
 * Get movie comments from a list of friends.
 * @param {Array} friends - Array of friend objects.
 * @param {string} movieID - The ID of the movie.
 * @returns {Promise<Array>} - Array of friends' comments.
 */
export const getFriendsMovieComments = async (friends, movieID) => {
  if (!friends || friends.length === 0 || !movieID) return [];

  const comments = await Promise.all(
    friends.map(async ({ user2: friendID }) => { // Assuming 'user2' is the friend ID
      const commentRef = doc(db, "users", friendID, "movieComments", movieID);
      const commentSnap = await getDoc(commentRef);

      if (commentSnap.exists()) {
        return {
          friendID,
          comment: commentSnap.data().comment,
        };
      }
      return null;
    })
  );

  return comments.filter(Boolean); // Remove null values
};

