import { useQueryClient, useQuery } from "@tanstack/react-query";
import { db } from "../firebase/firebaseConfig";
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";

// ✅ Fetch friend requests (Runs once, updates via cache)
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
    staleTime: Infinity, // Prevents unnecessary re-fetches
  });
};

// ✅ Real-time listener (Updates React Query cache)
export const useListenForFriendRequests = (userId) => {
  const queryClient = useQueryClient(); // ✅ Now used correctly

  useEffect(() => {
    if (!userId) return undefined;

    const q = query(collection(db, "friend_requests"), where("recipientId", "==", userId));

    // Firestore real-time listener
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newRequests = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      queryClient.setQueryData(["receivedFriendRequests", userId], newRequests);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [userId, queryClient]);
};
