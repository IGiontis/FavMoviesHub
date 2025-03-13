import { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, Button, Input, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUserMovieComments from "../hooks/comments/useUserMovieComments"; // 🔄 Updated hook
import { saveUserMovieComment } from "../services/movieComments/movieCommentService";

const MovieCommentsModal = ({ movieID, userID, isOpen, toggleModal, movieTitle }) => {
  const [comment, setComment] = useState("");
  const { data: userComments } = useUserMovieComments(userID); //  Fetch all user comments
  const queryClient = useQueryClient();

  console.log(userComments)

  useEffect(() => {
    if (userComments && userComments[movieID]) {
      setComment(userComments[movieID]); //  Get specific movie comment
    }
  }, [userComments, movieID]);

  const mutation = useMutation({
    mutationFn: saveUserMovieComment,
    onSuccess: () => {
      setComment("");
      toggleModal();
      queryClient.invalidateQueries(["userMovieComments", userID]); // 🔄 Invalidate entire user comments cache
    },
    onError: (error) => {
      console.error("Error saving comment:", error);
    },
  });

  const handleSaveComment = async () => {
    try {
      await mutation.mutateAsync({ userID, movieID, comment });
    } catch (error) {
      console.error("Failed to save comment:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={mutation.isPending ? undefined : toggleModal}
      backdrop={mutation.isPending ? "static" : true}
      keyboard={!mutation.isPending}
    >
      <ModalHeader toggle={mutation.isPending ? undefined : toggleModal}>Comment on {movieTitle}</ModalHeader>
      <ModalBody>
        <Input
          type="textarea"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your comment..."
          rows="4"
          disabled={mutation.isPending}
        />
        {mutation.isError && <div style={{ color: "red" }}>Error: {mutation.error?.message}</div>}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggleModal} disabled={mutation.isPending}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSaveComment} disabled={mutation.isPending || !comment.trim()}>
          {mutation.isPending ? "Saving..." : "Save Comment"}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

MovieCommentsModal.propTypes = {
  movieID: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  movieTitle: PropTypes.string.isRequired,
};

export default MovieCommentsModal;
