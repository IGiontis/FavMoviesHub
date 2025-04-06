import classnames from "classnames";
import { Badge, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faComments } from "@fortawesome/free-solid-svg-icons";
import MovieUserComment from "./MovieUserComment";
import PropTypes from "prop-types";
import FriendsMovieComments from "./FriendsMovieComments";
import useUserMovieComments from "../../hooks/comments/useUserMovieComments";
import styles from "./MovieInteractionButtons.module.css";

const MovieInteractionButtons = ({
  toggleCommentModal,
  toggleShowFriendsComments,
  friendsCommentCount,
  user,
  movie,
  isFriendsCommentsShow,
  friendsComments,
}) => {
  const hasFriendsComments = friendsComments?.length > 0;
  const { data: comments, isLoading, isError } = useUserMovieComments(user.uid);
  const userComment = comments?.[movie.imdbID] || null;

  return (
    <div className="mt-3">
      <div className="d-flex align-items-center border-bottom pb-2">
        <Button
          color="link"
          className="p-0 border-0 bg-transparent position-relative me-4"
          onClick={toggleCommentModal}
          aria-label="Comment on Movie"
        >
          <FontAwesomeIcon
            icon={faComment}
            size="lg"
            className={classnames(styles.iconHoverable, {
              "text-primary": userComment,
              "text-secondary": !userComment,
            })}
          />
        </Button>

        <Button
          color="link"
          className="p-0 border-0 bg-transparent position-relative"
          onClick={toggleShowFriendsComments}
          aria-label="Show Friends' Comments"
        >
          <FontAwesomeIcon
            icon={faComments}
            size="lg"
            className={classnames({
              "text-primary": hasFriendsComments,
              "text-secondary": !hasFriendsComments,
            })}
          />

          {hasFriendsComments && (
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
      </div>

      <MovieUserComment user={user} movie={movie} comment={userComment} isLoading={isLoading} isError={isError} />

      {/* Apply fade transition with CSS classes */}
      <div
        className={classnames({
          [styles.fadeEnter]: !isFriendsCommentsShow,
          [styles.fadeEnterActive]: isFriendsCommentsShow,
          [styles.fadeExit]: isFriendsCommentsShow,
          [styles.fadeExitActive]: !isFriendsCommentsShow,
        })}
      >
        {isFriendsCommentsShow && (
          <FriendsMovieComments userID={user.uid} movieID={movie.imdbID} friendsComments={friendsComments} />
        )}
      </div>
    </div>
  );
};

MovieInteractionButtons.propTypes = {
  toggleCommentModal: PropTypes.func.isRequired,
  toggleShowFriendsComments: PropTypes.func.isRequired,
  friendsCommentCount: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  movie: PropTypes.object.isRequired,
  isFriendsCommentsShow: PropTypes.bool,
  friendsComments: PropTypes.arrayOf(PropTypes.object),
};

export default MovieInteractionButtons;
