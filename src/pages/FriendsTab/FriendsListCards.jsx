import PropTypes from "prop-types";
import { Card, CardBody, Spinner } from "reactstrap";
import classNames from "classnames"; // ✅ Cleaner class management
import { memo } from "react"; // ✅ Prevent unnecessary re-renders
import styles from "./friendsTab.module.css"; // ✅ Import CSS Module

const FriendsListCards = ({ handleFriendSelection, friend, selectedFriend, usernames, index }) => {
  const { user2 } = friend; // ✅ Destructure for better readability
  const isSelected = selectedFriend === user2;
  
  return (
    <Card
      onClick={() => handleFriendSelection(user2)}
      className={classNames("shadow-sm text-center", styles.friendCard, { [styles.active]: isSelected })}
      role="button" // ✅ Improves accessibility
    >
      <CardBody className="p-2">
        {index + 1}: <strong>{usernames[index]?.username || <Spinner size="sm" />}</strong>
      </CardBody>
    </Card>
  );
};

// ✅ Better PropTypes Definition
FriendsListCards.propTypes = {
  handleFriendSelection: PropTypes.func.isRequired,
  friend: PropTypes.shape({
    user2: PropTypes.string.isRequired, // ✅ Enforce structure
  }).isRequired,
  selectedFriend: PropTypes.string,
  usernames: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string, 
    })
  ).isRequired,
  index: PropTypes.number.isRequired,
};

// ✅ Use React.memo to prevent unnecessary re-renders
export default memo(FriendsListCards);
