import PropTypes from "prop-types";
import { Badge } from "reactstrap";

const BadgeFriendList = ({ requestCount }) => {
  if (requestCount === 0) return null; // ✅ Don't render if no requests

  return (
    <Badge
      color="danger"
      pill
      className="position-absolute top-0 start-100 translate-middle"
      style={{
        fontSize: "0.65rem", 
        padding: "3px 6px",
        transform: "translate(40%, -40%)", // ✅ Fine-tune placement
      }}
    >
      {requestCount}
    </Badge>
  );
};

BadgeFriendList.propTypes = {
  requestCount: PropTypes.number.isRequired,
};

export default BadgeFriendList;
