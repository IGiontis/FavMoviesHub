import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "../firebase/firebaseConfig";
import { collection, query, where, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

// ✅ Fetch friend requests sent by the current user
export const useFriendRequests = (userId) => {
  console.log("enters here ") //TODO
  return useQuery({
    queryKey: ["friendRequests", userId],
    queryFn: async () => {
      if (!userId) return [];
      const q = query(collection(db, "friend_requests"), where("senderId", "==", userId));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
    enabled: !!userId, // Don't fetch if there's no user
  });
};

// ✅ Mutation to send a friend request
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

// ✅ Mutation to delete a friend request
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
