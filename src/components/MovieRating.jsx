import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import PropTypes from "prop-types";
import Rating from "@mui/material/Rating";
import CircularProgress from "@mui/material/CircularProgress";
import { useCallback, useState } from "react";


//  MovieRating Component
const MovieRating = ({ movieID = "", userID = "" }) => {
  const { userRating, isLoading, updateRating } = useMovieRating(movieID, userID);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRatingChange = useCallback(
    (_, newValue) => {
      if (newValue !== userRating) updateRating(newValue);
    },
    [userRating, updateRating]
  );

  return (
    <div style={{ minHeight: "35px", display: "flex", alignItems: "center" }}>
      {isLoading ? (
        <CircularProgress size={30} color="warning" />
      ) : (
        <Rating
          name="movie-rating"
          value={hoverRating || userRating || 0}
          onChange={handleRatingChange}
          precision={0.5} // Allows half-star ratings
          onChangeActive={(_, newHoverValue) => setHoverRating(newHoverValue)} // Show on hover/touch
          onMouseLeave={() => setHoverRating(0)} // Reset on leave
        />
      )}
    </div>
  );
};

//  Custom Hook: Encapsulates fetching & mutation logic
const useMovieRating = (movieID, userID) => {
  const queryClient = useQueryClient();

  // 🔹 Fetch user rating from Firestore
  const { data: userRating = 0, isLoading, refetch } = useQuery({
    queryKey: ["movieRating", userID, movieID],
    queryFn: async () => {
      if (!userID || !movieID) return 0;
      try {
        const ratingRef = doc(db, "movieRatings", `${userID}_${movieID}`);
        const ratingSnap = await getDoc(ratingRef, { source: "cache" }).catch(() => getDoc(ratingRef));
        return ratingSnap.exists() ? ratingSnap.data().rating : 0;
      } catch (error) {
        console.error("🔥 Firebase Fetch Error:", error);
        return 0;
      }
    },
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });

  // Mutation for updating rating
  const mutation = useMutation({
    mutationFn: async (rating) => {
      if (!userID || !movieID) return;
      const ratingRef = doc(db, "movieRatings", `${userID}_${movieID}`);
      await setDoc(ratingRef, { rating, userID, movieID }, { merge: true });
    },
    onMutate: async (newRating) => {
      const previousRating = queryClient.getQueryData(["movieRating", userID, movieID]);
      queryClient.setQueryData(["movieRating", userID, movieID], newRating);
      return { previousRating };
    },
    onError: (error, _, context) => {
      console.error("🔥 Firebase Save Error:", error);
      queryClient.setQueryData(["movieRating", userID, movieID], context?.previousRating);
    },
    onSuccess: () => {
      refetch(); // Refresh only this query instead of invalidating all queries
    },
  });

  return { userRating, isLoading, updateRating: mutation.mutate };
};


MovieRating.propTypes = {
  movieID: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired,
};

export default MovieRating;
