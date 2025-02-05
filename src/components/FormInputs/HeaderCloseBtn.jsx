import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const HeaderCloseBtn = ({ title, onClose }) => {
  return (
    <div className="d-flex flex-wrap align-items-center justify-content-between">
      <h5 className="mb-0">{title}</h5>
      {onClose && (
        <button
          type="button"
          className="btn p-0 border-0"
          onClick={onClose}
          style={{ outline: "none", boxShadow: "none" }}
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
      )}
    </div>
  );
};

HeaderCloseBtn.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
};

export default HeaderCloseBtn;
