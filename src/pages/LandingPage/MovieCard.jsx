import { memo, useCallback, useState } from "react";
import { Card, CardBody, CardImg, CardTitle, Button, Badge } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as solidHeart,
  faHeart as regularHeart,
  faComment,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import MovieRating from "../../components/MovieRatings/MovieRating";
import defaultImage from "../../assets/movieBackground.jpeg";

import MovieComment from "../../components/MovieComments/MovieComment";
import MovieCommentsModal from "../../components/MovieComments/MovieCommentsModal";
import FriendsMovieComments from "../../components/MovieComments/FriendsMovieComments";

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

        {user && (
          <div className="mt-3">
            <div className="d-flex align-items-center">
              <span className="me-4">
                <Button
                  color="link"
                  className="p-0 border-0 bg-transparent position-relative"
                  onClick={toggleCommentModal}
                  aria-label="Comment on Movie"
                >
                  <FontAwesomeIcon icon={faComment} size="lg" className="text-primary" />
                </Button>
              </span>
              <span>
                <Button
                  color="link"
                  className="p-0 border-0 bg-transparent position-relative"
                  onClick={toggleShowFriendsComments}
                  aria-label="Show Friends' Comments"
                >
                  <FontAwesomeIcon icon={faComments} size="lg" className="text-primary" />
                  {friendsCommentCount > 0 && (
                    <Badge
                      color="danger"
                      pill
                      className="position-absolute top-0 start-100 translate-middle"
                      style={{ fontSize: "0.75rem", minWidth: "1.25rem", padding: "0.2rem 0.4rem" }}
                    >
                      {friendsCommentCount}
                    </Badge>
                  )}
                </Button>
              </span>
            </div>
            <MovieComment user={user} movie={movie} />
          </div>
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
