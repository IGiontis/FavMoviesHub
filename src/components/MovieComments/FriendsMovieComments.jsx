import PropTypes from "prop-types";
import { Spinner, Alert } from "reactstrap";
import useFriendsMovieComments from "../../hooks/comments/useFriendsMovieComments";

const FriendsMovieComments = ({ userID, movieID }) => {
  const { data: friendsComments = [], isLoading, isError, error } = useFriendsMovieComments(userID, movieID);

  if (isLoading) return <Spinner color="primary" />;
  if (isError) {
    console.error("Error fetching friends' comments:", error);
    return <Alert color="danger">Failed to load comments: {error.message}</Alert>;
  }

  console.log(friendsComments);

  return (
    <div className="mt-3">
      <h6>Friends Comments:</h6>
      {friendsComments.length > 0 ? (
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
};

export default FriendsMovieComments;
