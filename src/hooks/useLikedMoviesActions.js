import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLikedMovieToDB, removeLikedMovieFromDB } from "../services/likedMoviesService";
import { toast } from "react-toastify";

const useLikedMoviesActions = (userId) => {
  const queryClient = useQueryClient();

  const addMovieMutation = useMutation({
    mutationFn: (movie) => addLikedMovieToDB(userId, movie),
    onMutate: async (newMovie) => {
      await queryClient.cancelQueries(["likedMovies", userId]);

      queryClient.setQueryData(["likedMovies", userId], (oldMovies = []) => [...oldMovies, newMovie]);
    },
    onError: (error, _, rollback) => {
      console.error("Failed to like movie:", error);
      toast.error(error.message || "Failed to like movie.");
      if (rollback) rollback();
    },
    onSettled: () => queryClient.invalidateQueries(["likedMovies", userId]),
  });

  const removeMovieMutation = useMutation({
    mutationFn: (movieID) => removeLikedMovieFromDB(userId, movieID),
    onMutate: async (movieID) => {
      await queryClient.cancelQueries(["likedMovies", userId]);

      const previousMovies = queryClient.getQueryData(["likedMovies", userId]);
      queryClient.setQueryData(["likedMovies", userId], (oldMovies = []) =>
        oldMovies.filter((m) => m.imdbID !== movieID)
      );

      return () => queryClient.setQueryData(["likedMovies", userId], previousMovies);
    },
    onError: (error, _, rollback) => {
      console.error("Failed to remove movie:", error);
      toast.error(error.message || "Failed to remove movie.");
      if (rollback) rollback();
    },
    onSettled: () => queryClient.invalidateQueries(["likedMovies", userId]),
  });

  return { addMovieMutation, removeMovieMutation };
};

export default useLikedMoviesActions;
