import PropTypes from "prop-types";

import { useMemo } from "react";
import TranslatedText from "../Language/TranslatedText";

const FriendsMovieComments = ({ friendsComments }) => {
  // Memoize the count to prevent unnecessary calculations
  const commentCount = useMemo(() => friendsComments.length, [friendsComments]);

  return (
    <div className="mt-3">
      <h6>
        <TranslatedText text="friendsComments" ns="movie" />
      </h6>

      {commentCount > 0 ? (
        <ul className="list-unstyled">
          {friendsComments.map(({ friendID, friendUsername, comment }) => (
            <li key={friendID} className="mb-2">
              <strong>{friendUsername}:</strong> {comment}
            </li>
          ))}
        </ul>
      ) : (
        <p>
          <TranslatedText text="noFriendsComments" ns="movie" />
        </p>
      )}
    </div>
  );
};

FriendsMovieComments.propTypes = {
  friendsComments: PropTypes.array,
};

export default FriendsMovieComments;
