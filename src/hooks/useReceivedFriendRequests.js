import { useQuery } from "@tanstack/react-query";
import { db } from "../firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

// ✅ Fetch friend requests received by the current user
export const useReceivedFriendRequests = (userId) => {
  return useQuery({
    queryKey: ["receivedFriendRequests", userId],
    queryFn: async () => {
      if (!userId) return [];
      const q = query(collection(db, "friend_requests"), where("recipientId", "==", userId));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
    enabled: !!userId, // Fetch only if user is logged in
  });
};
