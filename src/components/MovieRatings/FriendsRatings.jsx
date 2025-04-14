import PropTypes from "prop-types";
import { useCallback, useMemo } from "react";
import { CircularProgress, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import useFriendsMovieRatings from "../../hooks/friendsRatings/useFriendsMovieRatings";

const FriendsRatings = ({ userID, movieID, onClickTotalRatings }) => {
  const { data: friendsRatings, isLoading } = useFriendsMovieRatings(userID, movieID);

  const totalRatings = useMemo(() => friendsRatings.length, [friendsRatings]);

  const averageRating = useMemo(() => {
    if (totalRatings === 0) return 0;
    const sum = friendsRatings.reduce((acc, { rating }) => acc + rating, 0);
    return sum / totalRatings;
  }, [friendsRatings, totalRatings]);

  const handleClickTotalRatings = useCallback(() => {
    if (onClickTotalRatings) {
      onClickTotalRatings(friendsRatings);
    }
  }, [friendsRatings, onClickTotalRatings]);

  return (
    <div >
      <div className="d-flex flex-wrap align-items-center">
        {isLoading ? (
          <CircularProgress size={30} color="warning" />
        ) : (
          <>
            <Rating
              value={averageRating}
              readOnly
              disabled
              precision={0.5}
              emptyIcon={<StarIcon className="star-empty" fontSize="inherit" />}
            />
            {totalRatings > 0 && (
              <span
                className=" ms-2 text-primary cursor-pointer"
                style={{ cursor: "pointer" }}
                onClick={handleClickTotalRatings}
              >
                ({totalRatings})
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
};

FriendsRatings.propTypes = {
  userID: PropTypes.string.isRequired,
  movieID: PropTypes.string.isRequired,
  onClickTotalRatings: PropTypes.func, // This is an optional callback
};

export default FriendsRatings;
