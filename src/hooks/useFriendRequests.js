import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "../firebase/firebaseConfig";
import { collection, query, where, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

/**
 * Fetch friend requests for a given user.
 * Can be used independently of React Query.
 */
const fetchFriendRequests = async (userID) => {
  if (!userID) return [];

  try {
    const q = query(collection(db, "friend_requests"), where("senderId", "==", userID));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching friend requests:", error);
    throw new Error("Failed to fetch friend requests.");
  }
};

/**
 * React Query hook to get friend requests.
 */
export const useFriendRequests = (userID) => {
  return useQuery({
    queryKey: ["friendRequests", userID],
    queryFn: () => fetchFriendRequests(userID),
    enabled: !!userID, // Prevents fetching if userID is falsy
  });
};

/**
 * Mutation to send a friend request.
 */
export const useSendFriendRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ senderId, recipientId }) => {
      if (!senderId || !recipientId) throw new Error("Missing user IDs");
      return addDoc(collection(db, "friend_requests"), {
        senderId,
        recipientId,
        status: "pending",
        timestamp: new Date().toISOString(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["friendRequests"]);
    },
  });
};

/**
 * Mutation to delete a friend request.
 */
export const useDeleteFriendRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (requestId) => {
      return deleteDoc(doc(db, "friend_requests", requestId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["friendRequests"]);
    },
  });
};
