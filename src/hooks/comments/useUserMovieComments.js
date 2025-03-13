import { useQuery } from "@tanstack/react-query";
import { getAllUserMovieComments } from "../../services/movieComments/getAllUserMovieComments";

const useUserMovieComments = (userID) => {
  return useQuery({
    queryKey: ["userMovieComments", userID],
    queryFn: async () => await getAllUserMovieComments(userID),
    enabled: !!userID, // Runs only if userID exists
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

export default useUserMovieComments;
