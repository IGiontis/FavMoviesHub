import { Badge, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faComments } from "@fortawesome/free-solid-svg-icons";
import MovieUserComment from "./MovieUserComment";
import PropTypes from "prop-types";

const MovieInteractionButtons = ({
  toggleCommentModal,
  toggleShowFriendsComments,
  friendsCommentCount,
  user,
  movie,
}) => {
  return (
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
      <MovieUserComment user={user} movie={movie} />
    </div>
  );
};

MovieInteractionButtons.propTypes = {
  toggleCommentModal: PropTypes.func.isRequired,
  toggleShowFriendsComments: PropTypes.func.isRequired,
  friendsCommentCount: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  movie: PropTypes.object.isRequired,
};

export default MovieInteractionButtons;
