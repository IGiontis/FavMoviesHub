import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { memo } from "react";

const CancelSaveButtons = memo(({ cancelLabel = "Cancel", onCancel, onSave, submitLabel = "Save", disabled }) => {
  return (
    <div className="d-flex flex-wrap align-items-center justify-content-end">
      {onCancel && (
        <Button type="button" onClick={onCancel} className="me-2 custom-transparent-btn" disabled={disabled}>
          {cancelLabel}
        </Button>
      )}
      <Button
        type="button"
        color="primary"
        onClick={onSave}
        className="d-flex align-items-center py-1 px-2 "
        disabled={disabled}
      >
        {submitLabel}
      </Button>
    </div>
  );
});

CancelSaveButtons.displayName = "CancelSaveButtons";

CancelSaveButtons.propTypes = {
  onCancel: PropTypes.func,
  disabled: PropTypes.bool,
  onSave: PropTypes.func,
  submitLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
};

export default CancelSaveButtons;
