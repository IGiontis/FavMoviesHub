import { useCallback, useState, memo } from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import useUserMovieComments from "../../hooks/comments/useUserMovieComments";
import useDeleteUserComment from "../../hooks/comments/useDeleteUserComment";
import ConfirmationModal from "../ConfirmationModal";
import TranslatedText from "../Language/TranslatedText";

const MovieUserComment = ({ user, movie }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: comments, isLoading, isError } = useUserMovieComments(user.uid);
  const { mutateAsync: deleteComment, isPending: isDeleting } = useDeleteUserComment();

  const comment = comments?.[movie.imdbID] || null;

  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  const handleConfirm = useCallback(async () => {
    try {
      await deleteComment({ userID: user.uid, movieID: movie.imdbID });
      toggleModal();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  }, [deleteComment, movie.imdbID, user.uid, toggleModal]);

  return (
    <div className="mt-3">
      {isLoading && <p>Loading comments...</p>}
      {isError && <p>Error fetching comments.</p>}
      {comment ? (
        <div className="d-flex align-items-center justify-content-between">
          <p className="text-break mb-0 me-2">{comment}</p>
          <Button
            color="link"
            size="sm"
            className="text-danger"
            onClick={toggleModal}
            disabled={isDeleting}
            aria-label="Delete Comment"
          >
            {isDeleting ? "Deleting..." : <FontAwesomeIcon icon={faTrash} />}
          </Button>
        </div>
      ) : (
        <p className="mb-0">
          <TranslatedText text="noComments" ns="movie" />
        </p>
      )}
      <ConfirmationModal
        isOpen={isModalOpen}
        message={`Are you sure you want to delete this comment?`}
        onConfirm={handleConfirm}
        onCancel={toggleModal}
      />
    </div>
  );
};

MovieUserComment.propTypes = {
  movie: PropTypes.object.isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

export default memo(MovieUserComment);
