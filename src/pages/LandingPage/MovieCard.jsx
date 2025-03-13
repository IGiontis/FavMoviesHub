import { memo, useState } from "react";
import { Card, CardBody, CardImg, CardTitle, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart, faHeart as regularHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import MovieRating from "../../components/MovieRating";
import defaultImage from "../../assets/movieBackground.jpeg";

import MovieComment from "../../components/MovieComment";
import MovieCommentsModal from "../../components/MovieCommentsModal";

const MovieCard = ({ movie, isLiked, isProcessing, handleMovieLike, user }) => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const posterSrc = movie.Poster !== "N/A" ? movie.Poster : defaultImage;

  const toggleCommentModal = () => setIsCommentModalOpen((prev) => !prev);

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

      <CardImg top width="100%" height="400px" src={posterSrc} alt={movie.Title} loading="lazy" />

      <CardBody>
        <CardTitle tag="h5" className="d-flex align-items-center justify-content-between">
          <div>{movie.Title}</div>

          {user && (
            <span className="ms-3">
              <Button
                color="link"
                className="p-0 border-0 bg-transparent"
                onClick={toggleCommentModal}
                aria-label="Comment on Movie"
              >
                <FontAwesomeIcon icon={faComment} size="lg" className="text-primary" />
              </Button>
            </span>
          )}
        </CardTitle>

        <div className="d-flex align-items-center justify-content-between">
          <div>
            <p className="mb-0 mt-4">
              Year: <strong>{movie.Year}</strong>
            </p>
            <p className="mb-0">
              Type: <strong>{movie.Type}</strong>
            </p>

            {user && <MovieComment user={user} movie={movie} />}
          </div>

          {user && <MovieRating movieID={movie.imdbID} userID={user.uid} />}
          {user && (
            <MovieCommentsModal
              movieID={movie.imdbID}
              userID={user.uid}
              isOpen={isCommentModalOpen}
              toggleModal={toggleCommentModal}
              movieTitle={movie.Title}
            />
          )}
        </div>
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
