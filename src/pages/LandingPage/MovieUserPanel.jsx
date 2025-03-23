import { memo } from "react";
import { Card, CardBody, CardImg, CardTitle } from "reactstrap";
import defaultImage from "../../assets/movieBackground.jpeg";
import UserActions from "./UserActions";
import PropTypes from "prop-types";

const MovieUserPanel = ({ movie, isLiked, isProcessing, handleMovieLike, user }) => {
  const posterSrc = movie.Poster !== "N/A" ? movie.Poster : defaultImage;

  return (
    <Card className="position-relative">
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
        <CardTitle tag="h5">{movie.Title}</CardTitle>

        <p className="mb-0 mt-2">
          Year: <strong>{movie.Year}</strong>
        </p>
        <p className="mb-0">
          Type: <strong>{movie.Type}</strong>
        </p>

        {/* User actions (likes, comments, etc.) */}
        {user && (
          <UserActions
            movie={movie}
            isLiked={isLiked}
            isProcessing={isProcessing}
            handleMovieLike={handleMovieLike}
            user={user}
          />
        )}
      </CardBody>
    </Card>
  );
};

MovieUserPanel.propTypes = {
  movie: PropTypes.object.isRequired,
  isLiked: PropTypes.bool.isRequired,
  isProcessing: PropTypes.bool.isRequired,
  handleMovieLike: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default memo(MovieUserPanel);
