import PropTypes from "prop-types";
import { Card, CardBody, Spinner } from "reactstrap";
import styles from "./friendsTab.module.css"; // ✅ Import CSS Module

const FriendsListCards = ({ handleFriendSelection, friend, selectedFriend, usernames, index }) => {
  return (
    <Card
      onClick={() => handleFriendSelection(friend.user2)}
      style={{ cursor: "pointer" }}
      className={`shadow-sm text-center ${styles.friendCard} ${selectedFriend === friend.user2 ? styles.active : ""}`}
    >
      <CardBody className="p-2">
        {index + 1}: <strong>{usernames[index]?.username || <Spinner size="sm" />}</strong>
      </CardBody>
    </Card>
  );
};

FriendsListCards.propTypes = {
  handleFriendSelection: PropTypes.func.isRequired,
  friend: PropTypes.object.isRequired,
  selectedFriend: PropTypes.string,
  usernames: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
};

export default FriendsListCards;
