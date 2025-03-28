import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

/**
 * Subscribe to movie comments from a list of friends in real-time.
 * @param {Array} friends - Array of friend objects.
 * @param {string} movieID - The ID of the movie.
 * @param {function} callback - Function to update state with new comments.
 * @returns {function} - Unsubscribe function to stop listening.
 */
export const listenToFriendsMovieComments = (friends, movieID, callback) => {
  if (!friends || friends.length === 0 || !movieID) return () => {};

  const unsubscribeFunctions = friends.map(({ user2: friendID }) => {
    const commentRef = doc(db, "users", friendID, "movieComments", movieID);
    const userRef = doc(db, "users", friendID); // Fetch username

    return onSnapshot(commentRef, async (commentSnap) => {
      if (commentSnap.exists()) {
        //  Fetch friend's username
        const userSnap = await getDoc(userRef);
        const friendUsername = userSnap.exists() ? userSnap.data().username || "Unknown User" : "Unknown User";

        callback((prevComments) => {
          const updatedComments = prevComments.filter((c) => c.friendID !== friendID);
          return [...updatedComments, { friendID, friendUsername, comment: commentSnap.data().comment }];
        });
      } else {
        //  Handle comment deletion in real-time
        callback((prevComments) => prevComments.filter((c) => c.friendID !== friendID));
      }
    });
  });

  return () => {
    unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
  };
};
