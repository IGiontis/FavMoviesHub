import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

// Function to fetch liked movies from Firestore
const fetchLikedMovies = async (userID) => {
  if (!userID) return []; // Return empty array if userID is not provided

  // Firestore query to get movies from "likedMovies" collection for a specific user
  const moviesRef = collection(db, "users", userID, "likedMovies");
  const snapshot = await getDocs(moviesRef);

  // Map the snapshot to get the data of each movie
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Custom hook for fetching liked movies with real-time updates
export const useLikedMovies = (userID) => {
  const queryClient = useQueryClient();
  const [likedMovies, setLikedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(!!userID); // Set false if no userID

  // Fetch initial liked movies data using React Query
  const { data: initialLikedMovies } = useQuery({
    queryKey: ["likedMovies", userID],
    queryFn: () => fetchLikedMovies(userID),
    enabled: !!userID,
    staleTime: 0,
  });

  // Set initial liked movies after fetching data
  useEffect(() => {
    if (userID && initialLikedMovies) {
      setLikedMovies(initialLikedMovies);
      setIsLoading(false);
    } else if (!userID) {
      setIsLoading(false); // Immediately set to false if no user
    }
  }, [userID, initialLikedMovies]);

  // Real-time listener for updates using onSnapshot
  useEffect(() => {
    if (!userID) return undefined;

    const moviesRef = collection(db, "users", userID, "likedMovies");

    const unsubscribe = onSnapshot(moviesRef, (snapshot) => {
      const movies = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setLikedMovies(movies);
      queryClient.setQueryData(["likedMovies", userID], movies);
    });

    return () => {
      unsubscribe();
      setLikedMovies([]);
      setIsLoading(!!userID); // Only set true if user exists
    };
  }, [userID, queryClient]);

  return { likedMovies, isLoading };
};
