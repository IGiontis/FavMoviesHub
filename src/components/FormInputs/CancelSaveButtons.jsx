import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { memo } from "react";

const CancelSaveButtons = memo(({ cancelLabel = "Cancel", onCancel, onSave, submitLabel = "Save" }) => {
  return (
    <div className="d-flex flex-wrap align-items-center justify-content-end">
      {onCancel && (
        <Button type="button" onClick={onCancel} className="me-2 custom-transparent-btn">
          {cancelLabel}
        </Button>
      )}
      <Button type="button" color="primary" onClick={onSave} className="d-flex align-items-center py-1 px-2 ">
        {submitLabel}
      </Button>
    </div>
  );
});

CancelSaveButtons.displayName = "CancelSaveButtons";

CancelSaveButtons.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  submitLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
};

export default CancelSaveButtons;
