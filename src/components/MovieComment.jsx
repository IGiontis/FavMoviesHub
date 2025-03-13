// components/MovieComment.js

import PropTypes from "prop-types";

import useMovieComment from "../hooks/comments/useMovieComment";

const MovieComment = ({ user, movie }) => {
  const { data: comment, isLoading, isError } = useMovieComment(user.uid, movie.imdbID);

  return (
    <div>
      <div className="mt-3">
        {isLoading && <p>Loading comment...</p>}
        {isError && <p>Error fetching comment.</p>}
        {comment ? <p className="mb-0">{comment}</p> : <p className="mb-0">No comment yet.</p>}
      </div>
    </div>
  );
};

MovieComment.propTypes = {
  movie: PropTypes.object.isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieComment;
