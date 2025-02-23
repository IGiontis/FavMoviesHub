import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useLikedMovies = (userID) => {
  const queryClient = useQueryClient();
  const [likedMovies, setLikedMovies] = useState([]);

  useEffect(() => {
    if (!userID) return undefined; // ✅ Prevent running when no userID

    const moviesRef = collection(db, "users", userID, "likedMovies");

    // ✅ Firestore real-time listener
    const unsubscribe = onSnapshot(moviesRef, (snapshot) => {
      const movies = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setLikedMovies(movies);

      // ✅ Update React Query cache
      queryClient.setQueryData(["likedMovies", userID], movies);
    });

    return () => {
      unsubscribe();
    };
  }, [userID, queryClient]);

  return useQuery({
    queryKey: ["likedMovies", userID],
    queryFn: () => Promise.resolve(likedMovies), // ✅ Ensure function returns a valid promise
    enabled: !!userID,
    staleTime: Infinity,
    initialData: [],
  });
};
