import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import PropTypes from "prop-types";
import Rating from "@mui/material/Rating";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import { useCallback } from "react";

// MUI Icons
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";

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
          IconContainerComponent={IconContainer}
          getLabelText={(value) => customIcons[value]?.label || `${value} Star`}
          highlightSelectedOnly
        />
      )}
    </div>
  );
};

MovieRating.propTypes = {
  movieID: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired,
};

// Firebase Hook for Fetching & Updating Rating
const useMovieRating = (movieID, userID) => {
  const queryClient = useQueryClient();

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
    staleTime: 1000 * 60 * 5,
  });

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

// 🎨 MUI Custom Icons & Labels
const customIcons = {
  1: { label: "Very Dissatisfied", icon: <SentimentVeryDissatisfiedIcon color="error" /> },
  2: { label: "Dissatisfied", icon: <SentimentDissatisfiedIcon color="error" /> },
  3: { label: "Neutral", icon: <SentimentSatisfiedIcon color="warning" /> },
  4: { label: "Satisfied", icon: <SentimentSatisfiedAltIcon color="success" /> },
  5: { label: "Very Satisfied", icon: <SentimentVerySatisfiedIcon color="success" /> },
};

// 📌 Custom Icon Component
function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value]?.icon}</span>;
}

// 📌 Styled Rating Component
const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

// ✅ Define PropTypes for IconContainer
IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};
