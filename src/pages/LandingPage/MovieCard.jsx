import { memo, useCallback, useState } from "react";
import { Card, CardBody, CardImg, CardTitle, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart, faHeart as regularHeart } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import MovieRating from "../../components/MovieRatings/MovieRating";
import defaultImage from "../../assets/movieBackground.jpeg";

import MovieCommentsModal from "../../components/MovieComments/MovieCommentsModal";
import FriendsMovieComments from "../../components/MovieComments/FriendsMovieComments";
import MovieInteractionButtons from "../../components/MovieComments/MovieInteractionButtons";

const MovieCard = ({ movie, isLiked, isProcessing, handleMovieLike, user }) => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isFriendsCommentsShow, setIsFriendsCommentsShow] = useState(false);
  const [friendsCommentCount, setFriendsCommentCount] = useState(0); // Stores comment count

  const posterSrc = movie.Poster !== "N/A" ? movie.Poster : defaultImage;

  const toggleCommentModal = useCallback(() => setIsCommentModalOpen((prev) => !prev), []);
  const toggleShowFriendsComments = useCallback(() => setIsFriendsCommentsShow((prev) => !prev), []);

  return (
    <Card className="position-relative">
      {user && (
        <Button
          type="button"
          className="position-absolute top-0 end-0 m-2 p-1"
          onClick={() => handleMovieLike(movie)}
          disabled={isProcessing}
          aria-label={isLiked ? "Unlike Movie" : "Like Movie"}
        >
          <FontAwesomeIcon
            icon={isLiked ? solidHeart : regularHeart}
            size="lg"
            className={isLiked ? "text-danger" : "text-gray-500"}
          />
        </Button>
      )}

      <CardImg
        top
        width="100%"
        height="400px"
        src={posterSrc}
        alt={movie.Title}
        loading="lazy"
        style={{ objectFit: "cover" }}
      />

      <CardBody>
        <CardTitle tag="h5" className="d-flex align-items-center justify-content-between">
          <div>{movie.Title}</div>
        </CardTitle>

        <div className="d-flex align-items-center justify-content-between">
          <div>
            <p className="mb-0 mt-4">
              Year: <strong>{movie.Year}</strong>
            </p>
            <p className="mb-0">
              Type: <strong>{movie.Type}</strong>
            </p>
          </div>

          {user && <MovieRating movieID={movie.imdbID} userID={user.uid} />}
        </div>

        {user && (
          <>
            <MovieInteractionButtons
              toggleCommentModal={toggleCommentModal}
              toggleShowFriendsComments={toggleShowFriendsComments}
              friendsCommentCount={friendsCommentCount}
              user={user}
              movie={movie}
            />

            <MovieCommentsModal
              movieID={movie.imdbID}
              userID={user.uid}
              isOpen={isCommentModalOpen}
              toggleModal={toggleCommentModal}
              movieTitle={movie.Title}
            />
          </>
        )}

        {user && isFriendsCommentsShow && (
          <FriendsMovieComments
            userID={user.uid}
            movieID={movie.imdbID}
            onCommentCountChange={setFriendsCommentCount}
          />
        )}
      </CardBody>
    </Card>
  );
};

export default memo(MovieCard);

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Poster: PropTypes.string,
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    Type: PropTypes.string.isRequired,
    imdbID: PropTypes.string.isRequired,
  }).isRequired,
  isLiked: PropTypes.bool.isRequired,
  isProcessing: PropTypes.bool.isRequired,
  handleMovieLike: PropTypes.func.isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }), // Optional since the app might be used without login
};
