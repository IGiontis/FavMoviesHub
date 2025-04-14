import { collection, onSnapshot, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

/**
 * Subscribe to movie ratings from a list of friends in real-time.
 * @param {Array} friends - Array of friend objects.
 * @param {string} movieID - The ID of the movie.
 * @param {string} userID - The ID of the current user.
 * @param {function} callback - Function to update state with new ratings.
 * @returns {function} - Unsubscribe function to stop listening.
 */
export const listenToFriendsMovieRatings = (userID, friends, movieID, callback) => {
  if (!friends || friends.length === 0 || !movieID) return () => {};

  // Extract all friend IDs from the friendship list
  const friendIDs = friends.map(({ user1, user2 }) =>
    user1 === userID ? user2 : user1
  );

  const ratingsRef = collection(db, "movieRatings");

  const unsubscribe = onSnapshot(ratingsRef, async (snapshot) => {
    const relevantDocs = snapshot.docs.filter((docSnap) => {
      const [docUserId, docMovieId] = docSnap.id.split("_");
      return friendIDs.includes(docUserId) && docMovieId === movieID;
    });

    const ratings = await Promise.all(
      relevantDocs.map(async (docSnap) => {
        const [friendID] = docSnap.id.split("_");
        const data = docSnap.data();
        const userRef = doc(db, "users", friendID);
        const userSnap = await getDoc(userRef);
        const friendUsername = userSnap.exists() ? userSnap.data().username || "Unknown" : "Unknown";

        return {
          friendID,
          friendUsername,
          rating: data.rating,
        };
      })
    );

    callback(ratings);
  });

  return unsubscribe;
};
