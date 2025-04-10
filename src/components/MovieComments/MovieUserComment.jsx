import { useCallback, useState, memo } from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import useDeleteUserComment from "../../hooks/comments/useDeleteUserComment";
import ConfirmationModal from "../ConfirmationModal";
import LoaderSpinner from "../LoaderSpinner";
import TranslatedText from "../Language/TranslatedText";

const MovieUserComment = ({ user, movie, comment, isLoading, isError }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutateAsync: deleteComment, isPending: isDeleting } = useDeleteUserComment();

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
    <div className="py-3 border-bottom">
      {isLoading && <LoaderSpinner text="Loading comments..." />}
      {isError && <p>Error fetching comments.</p>}

      {!isLoading && !isError && comment && (
        <>
          <div className="fw-medium  ">
            <TranslatedText text="myComment" ns="movie" />
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <div className="text-break mb-0 me-2 d-flex ">{comment}</div>
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
        </>
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
  comment: PropTypes.string,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
};

export default memo(MovieUserComment);
