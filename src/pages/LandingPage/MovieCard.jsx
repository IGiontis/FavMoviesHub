import { memo } from "react";
import { Card, CardBody, CardImg, CardTitle, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart, faHeart as regularHeart } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import MovieRating from "../../components/MovieRating";
import defaultImage from "../../assets/movieBackground.jpeg";

const MovieCard = ({ movie, isLiked, isProcessing, handleMovieLike, user }) => {
  const posterSrc = movie.Poster !== "N/A" ? movie.Poster : defaultImage;

  return (
    <Card className="position-relative">
      {user && (
        <Button
          type="button"
          className="position-absolute top-0 end-0 m-2 p-1"
          onClick={() => handleMovieLike(movie)}
          disabled={isProcessing}
          aria-label={isLiked ? "Unlike Movie" : "Like Movie"} // ✅ Improves accessibility
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
        <CardTitle tag="h5">{movie.Title}</CardTitle>

        <div className="d-flex align-items-center justify-content-between">
          <div>
            <p className="mb-0 mt-4">
              Year: <strong>{movie.Year}</strong>
            </p>
            <p className="mb-0">
              Type: <strong>{movie.Type}</strong>
            </p>
          </div>

          {/* ✅ Render rating component only when user is logged in */}
          {user && <MovieRating movieID={movie.imdbID} userID={user.uid} />}
        </div>
      </CardBody>
    </Card>
  );
};

// ✅ Use React.memo to prevent unnecessary re-renders if props haven't changed
export default memo(MovieCard);

// ✅ Improved PropTypes for better validation
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
  }),
};
