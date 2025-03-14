import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import PropTypes from "prop-types";
import Rating from "@mui/material/Rating";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import { useCallback } from "react";

const MovieRating = ({ movieID, userID }) => {
  const { userRating, isLoading, updateRating } = useMovieRating(movieID, userID);

  // Memoized rating change handler
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
        <StyledRating
          name="highlight-selected-only"
          value={userRating}
          onChange={handleRatingChange}
          getLabelText={(value) => customIcons[value]?.label || `${value} Star`}
          slotProps={{
            icon: { component: CustomIcon }, // Ensure emojis are used instead of stars
            emptyIcon: { component: CustomIcon, className: "empty-icon" }, // For empty icons
          }}
        />
      )}
    </div>
  );
};

MovieRating.propTypes = {
  movieID: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired,
};

const useMovieRating = (movieID, userID) => {
  const queryClient = useQueryClient();

  // Fetch user rating from Firestore
  const { data: userRating = 0, isLoading } = useQuery({
    queryKey: ["movieRating", userID, movieID],
    queryFn: async () => {
      if (!userID || !movieID) return 0;
      try {
        const ratingRef = doc(db, "movieRatings", `${userID}_${movieID}`);
        const ratingSnap = await getDoc(ratingRef);
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
      queryClient.invalidateQueries(["movieRating", userID, movieID]);
    },
  });

  return { userRating, isLoading, updateRating: mutation.mutate };
};

export default MovieRating;

// 🎨 Custom Icons & Labels
const customIcons = {
  1: { label: "Very Dissatisfied", icon: "😡" },
  2: { label: "Dissatisfied", icon: "☹️" },
  3: { label: "Neutral", icon: "😐" },
  4: { label: "Satisfied", icon: "🙂" },
  5: { label: "Very Satisfied", icon: "🤩" },
};

// 📌 Custom Icon Component
const CustomIcon = ({ value, className }) => <span className={className}>{customIcons[value]?.icon || "☆"}</span>;

// ✅ Fix ESLint: Define PropTypes for CustomIcon
CustomIcon.propTypes = {
  value: PropTypes.number.isRequired,
  className: PropTypes.string,
};

// 📌 Styled Rating
const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": { color: "#ff6d75" },
  "& .MuiRating-iconHover": { color: "#ff3d47" },
});
