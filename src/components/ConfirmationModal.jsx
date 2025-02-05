import { Modal, ModalBody } from "reactstrap";
import PropTypes from "prop-types";

const ConfirmationModal = ({
  isOpen,
  title = "Are you sure?",
  message,
  confirmLabel = "Yes",
  cancelLabel = "No",
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal fade={true} isOpen={isOpen} toggle={onCancel} centered>
      <ModalBody className="text-center">
        <h4 className="text-muted mx-4 mb-0">{message}</h4>

        <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
          <button type="button" className="btn w-sm btn-light" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button type="button" className="btn w-sm btn-primary" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmationModal;
