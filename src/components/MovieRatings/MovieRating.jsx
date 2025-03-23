import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { Box, CircularProgress, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const MovieRating = ({ movieID, userID }) => {
  const queryClient = useQueryClient();

  const { data: userRating = 0, isLoading } = useQuery({
    queryKey: ["movieRating", userID, movieID],
    queryFn: async () => {
      if (!userID || !movieID) return 0;
      const ratingRef = doc(db, "movieRatings", `${userID}_${movieID}`);
      const ratingSnap = await getDoc(ratingRef);
      return ratingSnap.exists() ? ratingSnap.data().rating : 0;
    },
    staleTime: 1000 * 60 * 5,
  });

  const mutation = useMutation({
    mutationFn: async (rating) => {
      if (!userID || !movieID) return;
      const ratingRef = doc(db, "movieRatings", `${userID}_${movieID}`);
      await setDoc(ratingRef, { rating }, { merge: true });
    },
    onSuccess: () => queryClient.invalidateQueries(["movieRating", userID, movieID]),
  });

  const handleRatingChange = useCallback((_, newValue) => mutation.mutate(newValue), [mutation]);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {isLoading ? (
        <CircularProgress size={30} color="warning" />
      ) : (
        <Rating
          name="movie-rating"
          value={userRating}
          precision={0.5}
          onChange={handleRatingChange}
          emptyIcon={<StarIcon className="star-empty" fontSize="inherit" />}
        />
      )}
    </Box>
  );
};

MovieRating.propTypes = {
  movieID: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired,
};

export default MovieRating;
