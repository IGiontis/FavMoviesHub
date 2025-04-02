import { useCallback, useEffect, useState } from "react";
import { Modal, ModalBody, Button, Input, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUserMovieComments from "../../hooks/comments/useUserMovieComments";
import { saveUserMovieComment } from "../../services/movieComments/movieCommentService";
import TranslatedText from "../Language/TranslatedText";
import { useTranslation } from "react-i18next";

const MovieCommentsModal = ({ movieID, userID, isOpen, toggleModal, movieTitle }) => {
  const { t } = useTranslation("commentsModal");
  const [comment, setComment] = useState("");
  const { data: userComments } = useUserMovieComments(userID);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (userComments?.[movieID]) {
      setComment(userComments[movieID]); // If comment exists, set it
    } else {
      setComment(""); // If deleted, reset the state
    }
  }, [userComments, movieID]);

  const mutation = useMutation({
    mutationFn: saveUserMovieComment,
    onSuccess: () => {
      setComment("");
      toggleModal();
      queryClient.invalidateQueries(["userMovieComments", userID]); // Invalidate entire user comments cache
    },
    onError: (error) => {
      console.error("Error saving comment:", error);
    },
  });

  const handleSaveComment = useCallback(async () => {
    if (comment.trim() === userComments?.[movieID]) return; // Prevent unnecessary API call
    try {
      await mutation.mutateAsync({ userID, movieID, comment });
    } catch (error) {
      console.error("Failed to save comment:", error);
    }
  }, [mutation, userID, movieID, comment, userComments]);

  const handleToggle = useCallback(() => {
    if (!mutation.isPending) {
      toggleModal();
    }
  }, [mutation.isPending, toggleModal]);

  const handleCommentChange = useCallback((e) => {
    setComment(e.target.value.slice(0, 100));
  }, []);

  const placeholderText = t("enterYourComment");

  return (
    <Modal
      isOpen={isOpen}
      toggle={handleToggle}
      backdrop={mutation.isPending ? "static" : true}
      keyboard={!mutation.isPending}
      centered
    >
      <div className="p-3 d-flex  align-items-start justify-content-between">
        <h5 className="me-3 mb-0">
          <TranslatedText text="commentOn" ns="commentsModal" />
          {movieTitle}
        </h5>

        <Button close aria-label="Close" onClick={handleToggle}></Button>
      </div>
      <ModalBody>
        <div>
          <Input
            type="textarea"
            value={comment}
            onChange={handleCommentChange}
            placeholder={placeholderText}
            rows="4"
            disabled={mutation.isPending}
            className="no-resize"
          />

          <small className="d-flex justify-content-end mt-1">
            {100 - comment.length} <TranslatedText text="charactersLeft" ns="commentsModal" />
          </small>
        </div>

        {mutation.isError && <div style={{ color: "red" }}>Error: {mutation.error?.message}</div>}
      </ModalBody>
      <ModalFooter>
        <Button className="custom-transparent-btn" onClick={toggleModal} disabled={mutation.isPending}>
          <TranslatedText text="cancel" ns="commentsModal" />
        </Button>
        <Button  color="primary" onClick={handleSaveComment} disabled={mutation.isPending || !comment.trim()}>
          {mutation.isPending ? (
            <TranslatedText text="saving" ns="commentsModal" />
          ) : (
            <TranslatedText text="saveComment" ns="commentsModal" />
          )}
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
