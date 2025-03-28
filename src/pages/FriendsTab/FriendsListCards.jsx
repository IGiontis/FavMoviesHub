import PropTypes from "prop-types";
import { Card, CardBody, Spinner } from "reactstrap";
import classNames from "classnames";
import { memo } from "react";
import styles from "./friendsTab.module.css"; 

const FriendsListCards = ({ handleFriendSelection, friend, selectedFriend, usernames, index, isDisabled }) => {
  const { user2 } = friend; 
  const isSelected = selectedFriend === user2;
  
  return (
    <Card
      onClick={() => !isDisabled && handleFriendSelection(user2)}
      className={classNames("shadow-sm text-center", styles.friendCard, { [styles.active]: isSelected })}
      role="button" 
      style={{ pointerEvents: isDisabled ? "none" : "auto", opacity: isDisabled ? 0.6 : 1 }} // Disable clicking
    >
      <CardBody className="p-2">
        {index + 1}: <strong>{usernames[index]?.username || <Spinner size="sm" />}</strong>
      </CardBody>
    </Card>
  );
};

FriendsListCards.propTypes = {
  handleFriendSelection: PropTypes.func.isRequired,
  friend: PropTypes.shape({
    user2: PropTypes.string.isRequired,
  }).isRequired,
  selectedFriend: PropTypes.string,
  usernames: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string, 
    })
  ).isRequired,
  index: PropTypes.number.isRequired,
  isDisabled: PropTypes.bool.isRequired, 
};

export default memo(FriendsListCards);
