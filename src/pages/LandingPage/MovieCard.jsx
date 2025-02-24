import { Card, CardBody, CardImg, CardTitle, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart, faHeart as regularHeart } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import MovieRating from "../../components/MovieRating";
import defaultImage from "../../assets/movieBackground.jpeg"

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
      />

      <CardBody>
        {/* ✅ Correctly place the title */}
        <CardTitle>
          <h5>{movie.Title}</h5>
        </CardTitle>

        {/* ✅ Separate details and rating in a structured div */}
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <p className="mb-0 mt-4">
              Year: <strong>{movie.Year}</strong>
            </p>
            <p className="mb-0">
              Type: <strong>{movie.Type}</strong>
            </p>
          </div>

          {/* ✅ Keep the rating section separate */}
          {user && (
            <div className="mt-3">
              <MovieRating movieID={movie.imdbID} userID={user?.uid} />
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  isLiked: PropTypes.bool.isRequired,
  isProcessing: PropTypes.bool.isRequired,
  handleMovieLike: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default MovieCard;
