import { useCallback, useEffect, useState } from "react";
import { Modal, ModalBody, Button, Input, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUserMovieComments from "../../hooks/comments/useUserMovieComments";
import { saveUserMovieComment } from "../../services/movieComments/movieCommentService";
import TranslatedText from "../Language/TranslatedText";
import { useTranslation } from "react-i18next";

const MAX_COMMENT_LENGTH = 100;

const MovieCommentsModal = ({ movieID, userID, isOpen, toggleModal, movieTitle }) => {
  const { t } = useTranslation("commentsModal");
  const [comment, setComment] = useState("");
  const { data: userComments } = useUserMovieComments(userID);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (userComments?.[movieID]) {
      setComment(userComments[movieID]);
    } else {
      setComment("");
    }
  }, [userComments, movieID]);

  const saveCommentMutation = useMutation({
    mutationFn: saveUserMovieComment,
    onSuccess: () => {
      toggleModal();
      queryClient.invalidateQueries(["userMovieComments", userID]);
    },
    onError: (error) => {
      console.error("Error saving comment:", error);
    },
  });

  const handleSaveComment = useCallback(async () => {
    if (comment.trim() === userComments?.[movieID]) return;
    try {
      await saveCommentMutation.mutateAsync({ userID, movieID, comment });
    } catch (error) {
      console.error("Failed to save comment:", error);
    }
  }, [saveCommentMutation, userID, movieID, comment, userComments]);

  const handleToggle = useCallback(() => {
    if (!saveCommentMutation.isPending) {
      toggleModal();
    }
  }, [saveCommentMutation.isPending, toggleModal]);

  const handleCommentChange = useCallback((e) => {
    setComment(e.target.value.slice(0, MAX_COMMENT_LENGTH));
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      toggle={handleToggle}
      backdrop={saveCommentMutation.isPending ? "static" : true}
      keyboard={!saveCommentMutation.isPending}
      centered
    >
      <ModalHeader title={movieTitle} onClose={handleToggle} />
      <ModalContent
        comment={comment}
        onChange={handleCommentChange}
        isSaving={saveCommentMutation.isPending}
        error={saveCommentMutation.error}
        placeholder={t("enterYourComment")}
      />
      <ModalFooterActions
        onCancel={handleToggle}
        onSave={handleSaveComment}
        isSaving={saveCommentMutation.isPending}
        isSaveDisabled={!comment.trim()}
      />
    </Modal>
  );
};

// ------------------- Sub-components -------------------

const ModalHeader = ({ title, onClose }) => (
  <div className="p-3 d-flex align-items-start justify-content-between">
    <h5 className="me-3 mb-0">
      <TranslatedText text="commentOn" ns="commentsModal" /> {title}
    </h5>
    <Button close aria-label="Close" onClick={onClose} />
  </div>
);



const ModalContent = ({ comment, onChange, isSaving, error, placeholder }) => (
  <ModalBody>
    <div>
      <Input
        type="textarea"
        value={comment}
        onChange={onChange}
        placeholder={placeholder}
        rows="4"
        disabled={isSaving}
        className="no-resize"
      />
      <small className="d-flex justify-content-end mt-1">
        {MAX_COMMENT_LENGTH - comment.length} <TranslatedText text="charactersLeft" ns="commentsModal" />
      </small>
    </div>
    {error && <div style={{ color: "red" }}>Error: {error.message}</div>}
  </ModalBody>
);

ModalContent.propTypes = {
  comment: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired,
  error: PropTypes.object,
  placeholder: PropTypes.string.isRequired,
};

const ModalFooterActions = ({ onCancel, onSave, isSaving, isSaveDisabled }) => (
  <ModalFooter>
    <Button className="custom-transparent-btn" onClick={onCancel} disabled={isSaving}>
      <TranslatedText text="cancel" ns="commentsModal" />
    </Button>
    <Button color="primary" onClick={onSave} disabled={isSaving || isSaveDisabled}>
      {isSaving ? (
        <TranslatedText text="saving" ns="commentsModal" />
      ) : (
        <TranslatedText text="saveComment" ns="commentsModal" />
      )}
    </Button>
  </ModalFooter>
);

ModalHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

ModalFooterActions.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired,
  isSaveDisabled: PropTypes.bool.isRequired,
};

// ------------------- Parent component PropTypes -------------------

MovieCommentsModal.propTypes = {
  movieID: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  movieTitle: PropTypes.string.isRequired,
};

export default MovieCommentsModal;
