// hooks/useMovieComment.js
import { useQuery } from "@tanstack/react-query";
import { getMovieCommentFromDB} from "../../services/movieComments/getMovieCommentFromDB"


const useMovieComment = (userID, movieID) => {
  return useQuery({
    queryKey: ["movieComment", userID, movieID], 
    queryFn: async () => await getMovieCommentFromDB(userID, movieID),
    enabled: !!userID && !!movieID, // Ensures query runs only if both userID and movieID are available
    staleTime: 5 *  60 * 1000,
    cacheTime: 5 * 60 * 1000
  });
};

export default useMovieComment;
