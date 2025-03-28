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
  const [isLoading, setIsLoading] = useState(true); // Manage loading state

  // Fetch initial liked movies data using React Query
  const { data: initialLikedMovies } = useQuery({
    queryKey: ["likedMovies", userID], // queryKey
    queryFn: () => fetchLikedMovies(userID), // Use the fetchLikedMovies function here
    enabled: !!userID, // Only fetch when userID is present
    staleTime: 0, // Ensure data is always fresh (could be changed to suit your needs)
  });

  // Set initial liked movies after fetching data
  useEffect(() => {
    if (initialLikedMovies) {
      setLikedMovies(initialLikedMovies);
      setIsLoading(false); // Mark loading as done after data is fetched
    }
  }, [initialLikedMovies]);

  // Real-time listener for updates using onSnapshot
  useEffect(() => {
    if (!userID) return undefined;

    const moviesRef = collection(db, "users", userID, "likedMovies");

    const unsubscribe = onSnapshot(moviesRef, (snapshot) => {
      const movies = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setLikedMovies(movies); // Update local state with new data
      queryClient.setQueryData(["likedMovies", userID], movies); // Update React Query cache
    });

    return () => {
      unsubscribe(); // Clean up listener on component unmount or userID change
      setLikedMovies([]); // Reset state when switching friends
      setIsLoading(true); // Reset loading state
    };
  }, [userID, queryClient]);

  // Return the likedMovies state and isLoading status
  return { likedMovies, isLoading };
};
