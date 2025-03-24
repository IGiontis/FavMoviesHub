import PropTypes from "prop-types";
import { Badge } from "reactstrap";
import classNames from "classnames"; 

const BadgeFriendList = ({ requestCount, className }) => {
  console.log("BadgeFriendList requestCount:", requestCount);
  if (requestCount === 0) return null; 

  return (
    <Badge
      color="danger"
      pill
      className={classNames(
        "position-absolute start-100 translate-middle", 
        className 
      )}
      style={{
        fontSize: "0.65rem",
        padding: "3px 6px",
        transform: "translate(40%, -40%)", 
      }}
    >
      {requestCount}
    </Badge>
  );
};

BadgeFriendList.propTypes = {
  requestCount: PropTypes.number.isRequired,
  className: PropTypes.string, // Accept additional classNames
};

export default BadgeFriendList;
