import { db } from "../firebase/firebaseConfig";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";

/**
 * Accepts a friend request and adds both users as friends in Firestore.
 * @param {Object} request - The friend request object.
 * @param {Function} onSuccess - Callback function to invalidate queries.
 * @returns {Promise<void>}
 */
export const acceptFriendRequest = async (request, onSuccess) => {
  try {
    const friendsRef = collection(db, "friends");

    //  Store friendship for both users
    const friendshipData = {
      since: new Date().toISOString(),
    };

    await addDoc(friendsRef, { user1: request.senderId, user2: request.recipientId, ...friendshipData });
    await addDoc(friendsRef, { user1: request.recipientId, user2: request.senderId, ...friendshipData });

    //  Remove friend request after accepting
    await deleteDoc(doc(db, "friend_requests", request.id));

    //  Call success callback (e.g., invalidate queries)
    if (onSuccess) onSuccess();


  } catch (error) {
    console.error("Error accepting friend request:", error);
    throw error; // Propagate error so UI can handle it
  }
};
