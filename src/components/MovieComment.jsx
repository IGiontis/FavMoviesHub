import PropTypes from "prop-types";
import useUserMovieComments from "../hooks/comments/useUserMovieComments";

const MovieComment = ({ user, movie }) => {
  const { data: comments, isLoading, isError } = useUserMovieComments(user.uid);

  const comment = comments?.[movie.imdbID] || null;

  return (
    <div>
      <div className="mt-3">
        {isLoading && <p>Loading comments...</p>}
        {isError && <p>Error fetching comments.</p>}
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
