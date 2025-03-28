import { Col, Row } from "reactstrap";
import FriendsListCards from "./FriendsListCards";
import PropTypes from "prop-types";

const FriendsList = ({ friends, handleFriendSelection, selectedFriend, usernames, isFriendSelectionDisabled }) => (
  <Row className="g-3">
    {friends.map((friend, index) => (
      <Col key={friend.id} xs="auto">
        <FriendsListCards
          handleFriendSelection={handleFriendSelection}
          friend={friend}
          selectedFriend={selectedFriend}
          usernames={usernames}
          index={index}
          isDisabled={isFriendSelectionDisabled} 
        />
      </Col>
    ))}
  </Row>
);

FriendsList.propTypes = {
  handleFriendSelection: PropTypes.func.isRequired,
  friends: PropTypes.array.isRequired,
  selectedFriend: PropTypes.string,
  usernames: PropTypes.array.isRequired,
  isFriendSelectionDisabled: PropTypes.bool.isRequired, 
};

export default FriendsList;
