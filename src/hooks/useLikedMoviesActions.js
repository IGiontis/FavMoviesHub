import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLikedMovieToDB, removeLikedMovieFromDB } from "../services/likedMoviesService";
import { toast } from "react-toastify";

const useLikedMoviesActions = (userId) => {
  // Access the query client instance to manage query cache
  const queryClient = useQueryClient();

  // Mutation to add a liked movie
  const addMovieMutation = useMutation({
    mutationFn: (movie) => addLikedMovieToDB(userId, movie), // API call to add movie
    
    onMutate: async (newMovie) => {
      // Cancel any ongoing queries for liked movies to avoid conflicts
      await queryClient.cancelQueries(["likedMovies", userId]);
      
      // Optimistically update the cache with the new movie before the server responds
      queryClient.setQueryData(["likedMovies", userId], (oldMovies = []) => [...oldMovies, newMovie]);
    },
    
    onError: (error, _, rollback) => {
      console.error("Failed to like movie:", error);
      toast.error(error.message || "Failed to like movie.");
      // If there was a rollback function returned in onMutate, execute it to revert UI changes
      if (rollback) rollback();
    },
    
    // Once the mutation is complete (whether success or failure), re-fetch the liked movies
    onSettled: () => queryClient.invalidateQueries(["likedMovies", userId]),
  });

  // Mutation to remove a liked movie
  const removeMovieMutation = useMutation({
    mutationFn: (movieID) => removeLikedMovieFromDB(userId, movieID), // API call to remove movie
    
    onMutate: async (movieID) => {
      // Cancel any ongoing queries for liked movies to avoid conflicts
      await queryClient.cancelQueries(["likedMovies", userId]);

      // Get the previous state of liked movies before making any changes
      const previousMovies = queryClient.getQueryData(["likedMovies", userId]);
      
      // Optimistically update the cache by filtering out the removed movie
      queryClient.setQueryData(["likedMovies", userId], (oldMovies = []) =>
        oldMovies.filter((m) => m.imdbID !== movieID)
      );
      
      // Return a rollback function that restores the previous state in case of an error
      return () => queryClient.setQueryData(["likedMovies", userId], previousMovies);
    },
    
    onError: (error, _, rollback) => {
      console.error("Failed to remove movie:", error);
      toast.error(error.message || "Failed to remove movie.");
      // Rollback UI changes if mutation fails
      if (rollback) rollback();
    },
    
    // Re-fetch the liked movies after mutation is complete
    onSettled: () => queryClient.invalidateQueries(["likedMovies", userId]),
  });

  return { addMovieMutation, removeMovieMutation };
};

export default useLikedMoviesActions;