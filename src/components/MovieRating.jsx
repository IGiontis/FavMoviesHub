import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Rating from "react-rating-stars-component";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import PropTypes from "prop-types";

const MovieRating = ({ movieID = "", userID = "" }) => {
  const queryClient = useQueryClient();

  // Fetch rating
  const { data: userRating = 0, isLoading } = useQuery({
    queryKey: ["movieRating", userID, movieID],
    queryFn: fetchRating,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  // Mutation to update rating
  const mutation = useMutation({
    mutationFn: updateRating,
    onMutate: async ({ rating }) => {
      const previousRating = queryClient.getQueryData(["movieRating", userID, movieID]);

      queryClient.setQueryData(["movieRating", userID, movieID], rating);

      return { previousRating }; // Keep previous rating for rollback
    },
    onError: (error, _, context) => {
      console.error("🔥 Firebase Save Error:", error);
      queryClient.setQueryData(["movieRating", userID, movieID], context?.previousRating); // Rollback UI
    },
    onSettled: () => {
      queryClient.invalidateQueries(["movieRating", userID, movieID]); // Refresh data
    },
  });

  return (
    <div style={{ minHeight: "35px", display: "flex", alignItems: "center" }}>
      {isLoading ? (
        <div className="spinner-border text-warning" role="status"></div>
      ) : (
        <Rating
          count={5}
          value={userRating || 0}
          onChange={(rating) => {
            if (rating !== userRating) {
              mutation.mutate({ userID, movieID, rating });
            }
          }}
          size={30}
          activeColor="#ffd700"
        />
      )}
    </div>
  );
};

MovieRating.propTypes = {
  movieID: PropTypes.string,
  userID: PropTypes.string,
};

export default MovieRating;

// ***** FETCHING
const fetchRating = async ({ queryKey }) => {
  const [, userID, movieID] = queryKey;
  if (!userID || !movieID) return 0;

  try {
    const ratingRef = doc(db, "movieRatings", `${userID}_${movieID}`);
    const ratingSnap = await getDoc(ratingRef, { source: "cache" }).catch(() => getDoc(ratingRef));

    return ratingSnap.exists() ? ratingSnap.data().rating : 0;
  } catch (error) {
    console.error("🔥 Firebase Fetch Error:", error);
    return 0;
  }
};

//**** UPDATING */

const updateRating = async ({ userID, movieID, rating }) => {
  if (!userID || !movieID) return;

  const ratingRef = doc(db, "movieRatings", `${userID}_${movieID}`);
  await setDoc(ratingRef, { rating, userID, movieID }, { merge: true });
};
