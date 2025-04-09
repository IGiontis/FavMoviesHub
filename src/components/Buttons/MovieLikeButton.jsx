import { Button } from "reactstrap";
import styles from "./MovieLikeButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart, faHeart as regularHeart } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const MovieLikeButton = ({ isLiked, handleMovieLike, movie, isProcessing }) => {
  return (
    <Button
      type="button"
      className={`position-absolute top-0 end-0 m-2 p-1 ${styles.buttonHoverable}`}
      onClick={() => handleMovieLike(movie)}
      disabled={isProcessing}
      aria-label={isLiked ? "Unlike Movie" : "Like Movie"}
    >
      <FontAwesomeIcon
        icon={isLiked ? solidHeart : regularHeart}
        size="lg"
        className={`${isLiked ? "text-danger" : "text-gray-500"} ${styles.iconHoverable}`}
      />
    </Button>
  );
};

MovieLikeButton.propTypes = {
  isLiked: PropTypes.bool.isRequired,
  handleMovieLike: PropTypes.func.isRequired,
  movie: PropTypes.shape({
    imdbID: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
  }).isRequired,
  isProcessing: PropTypes.bool.isRequired,
};

export default MovieLikeButton;
