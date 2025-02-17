import { useQuery } from "@tanstack/react-query";
import { db } from "../firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export const useFriends = (userId) => {
  return useQuery({
    queryKey: ["friends", userId],
    queryFn: async () => {
      if (!userId) return [];
      const q = query(collection(db, "friends"), where("user1", "==", userId));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
    enabled: !!userId,
  });
};
