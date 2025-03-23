import PropTypes from "prop-types";

import { useMemo } from "react";

const FriendsMovieComments = ({ friendsComments }) => {
  // Memoize the count to prevent unnecessary calculations
  const commentCount = useMemo(() => friendsComments.length, [friendsComments]);

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
  friendsComments: PropTypes.array,
};

export default FriendsMovieComments;
