import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserComment } from "../../services/movieComments/deleteUserComment";

const useDeleteUserComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userID, movieID }) => {
      if (!userID || !movieID) {
        throw new Error("Missing userID or movieID in useDeleteUserComment");
      }

      await deleteUserComment(userID, movieID);
    },
    onSuccess: (_, { userID }) => {
   
      queryClient.invalidateQueries(["userMovieComments", userID]); 
    },
    onError: (error) => {
      console.error("❌ Error deleting comment:", error);
    },
  });
};

export default useDeleteUserComment;
