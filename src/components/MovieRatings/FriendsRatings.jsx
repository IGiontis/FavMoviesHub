import { useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { CircularProgress, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import useFriendsMovieRatings from "../../hooks/friendsRatings/useFriendsMovieRatings";
import TranslatedText from "../Language/TranslatedText";

// RatingDisplay Component: Handles displaying the rating and total rating count.
const RatingDisplay = ({ value, totalRatings, onClick }) => (
  <div className="d-flex align-items-center">
    <Rating
      value={value}
      readOnly
      disabled
      precision={0.5}
      emptyIcon={<StarIcon className="star-empty" fontSize="inherit" />}
    />
    {totalRatings > 0 && (
      <span
        className="ms-2 text-primary cursor-pointer"
        onClick={onClick}
        role="button"
        aria-label={`Show ${totalRatings} ratings`}
      >
        ({totalRatings})
      </span>
    )}
  </div>
);

RatingDisplay.propTypes = {
  value: PropTypes.number.isRequired,
  totalRatings: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

const FriendRatingItem = ({ friendUsername, rating }) => (
  <li className="d-flex justify-content-between align-items-center border-bottom py-3">
    <span>{friendUsername}</span>
    <Rating
      value={rating}
      readOnly
      disabled
      precision={0.5}
      emptyIcon={<StarIcon className="star-empty" fontSize="inherit" />}
    />
  </li>
);

FriendRatingItem.propTypes = {
  friendUsername: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

// Main FriendsRatings Component
const FriendsRatings = ({ userID, movieID }) => {
  const { data: friendsRatings, isLoading, error } = useFriendsMovieRatings(userID, movieID);
  const [isRatingsModalOpen, setIsRatingsModalOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setIsRatingsModalOpen((prev) => !prev);
  }, []);

  const totalRatings = useMemo(() => friendsRatings.length, [friendsRatings]);

  const averageRating = useMemo(() => {
    if (totalRatings === 0) return 0;
    const sum = friendsRatings.reduce((acc, { rating }) => acc + rating, 0);
    return sum / totalRatings;
  }, [friendsRatings, totalRatings]);

  if (error) {
    return <div className="alert alert-danger">Error loading ratings.</div>;
  }

  return (
    <div>
      <div className="d-flex flex-wrap align-items-center">
        {isLoading ? (
          <CircularProgress size={30} color="warning" />
        ) : (
          <RatingDisplay value={averageRating} totalRatings={totalRatings} onClick={toggleModal} />
        )}
      </div>

      <Modal isOpen={isRatingsModalOpen} toggle={toggleModal} centered>
        <ModalHeader toggle={toggleModal}>
          <TranslatedText text="friendsRatings" ns="ratingFriendsModal" />
        </ModalHeader>
        <ModalBody style={{ maxHeight: "500px", overflow: "auto" }}>
          <ul className="ps-0">
            {friendsRatings.map((friend) => (
              <FriendRatingItem key={friend.friendID} friendUsername={friend.friendUsername} rating={friend.rating} />
            ))}
          </ul>
        </ModalBody>
        <ModalFooter>
          <Button className="btn m-0" onClick={toggleModal}>
            <TranslatedText text="close" ns="ratingFriendsModal" />
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

FriendsRatings.propTypes = {
  userID: PropTypes.string.isRequired,
  movieID: PropTypes.string.isRequired,
};

export default FriendsRatings;
