import PropTypes from "prop-types";
import { Spinner, Alert } from "reactstrap";
import useFriendsMovieComments from "../../hooks/comments/useFriendsMovieComments";
import { useEffect, useMemo } from "react";

const FriendsMovieComments = ({ userID, movieID, onCommentCountChange }) => {
  const { data: friendsComments = [], isLoading, isError, error } = useFriendsMovieComments(userID, movieID);

  // Memoize the count to prevent unnecessary calculations
  const commentCount = useMemo(() => friendsComments.length, [friendsComments]);

  // Inform parent (`MovieCard`) about comment count when it changes
  useEffect(() => {
    onCommentCountChange(commentCount);
  }, [commentCount, onCommentCountChange]);

  if (isLoading) return <Spinner color="primary" />;
  if (isError) {
    console.error("Error fetching friends' comments:", error);
    return <Alert color="danger">Failed to load comments: {error.message}</Alert>;
  }

  return (
    <div className="mt-3">
     <h6>Friends&apos; Comments:</h6>

      {commentCount > 0 ? (
        <ul className="list-unstyled">
          {friendsComments.map(({ friendID, friendUsername, comment }) => (
            <li key={friendID} className="mb-2">
              <strong>{friendUsername}:</strong> {comment}
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments from friends yet.</p>
      )}
    </div>
  );
};

FriendsMovieComments.propTypes = {
  userID: PropTypes.string.isRequired,
  movieID: PropTypes.string.isRequired,
  onCommentCountChange: PropTypes.func.isRequired, // Callback to send count to parent
};

export default FriendsMovieComments;
