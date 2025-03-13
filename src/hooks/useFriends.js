import { useQuery } from "@tanstack/react-query";
import { db } from "../firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

//  Separate function for querying friends
const fetchFriends = async (userId) => {
  if (!userId) return [];

  const q = query(collection(db, "friends"), where("user1", "==", userId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const useFriends = (userId) => {
  return useQuery({
    queryKey: ["friends", userId],
    queryFn: () => fetchFriends(userId), 
    enabled: !!userId, //  Ensures it does NOT run if userId is falsy
    staleTime: 5 * 60 * 1000, //  Data stays fresh for 5 minutes
    cacheTime: 30 * 60 * 1000, //  Cached for 30 minutes
  });
};
