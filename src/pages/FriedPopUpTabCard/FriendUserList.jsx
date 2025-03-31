// src/components/FriendUserList.js

import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faClock, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import TranslatedText from "../../components/Language/TranslatedText";
import PropTypes from "prop-types";

const FriendUserList = ({ users, getFriendStatus, handleSendRequest, sendingUserId }) => {
  return (
    <ListGroup className="friends-max-height-tab">
      {users.map((user) => {
        const status = getFriendStatus(user.id);

        return (
          <ListGroupItem key={user.id} className="d-flex justify-content-between align-items-center flex-wrap">
            <span className="text-truncate flex-grow-1" style={{ wordBreak: "break-word", minWidth: "0" }}>
              {user.username}
            </span>

            {status === "friend" ? (
              <Button color="secondary" size="sm" className="ms-3" disabled>
                <FontAwesomeIcon icon={faUserCheck} /> <TranslatedText text="friend" ns="friendsPopup" />
              </Button>
            ) : status === "pending" ? (
              <Button color="secondary" size="sm" className="ms-3" disabled>
                <FontAwesomeIcon icon={faClock} /> <TranslatedText text="pending" ns="friendsPopup" />
              </Button>
            ) : (
              <Button
                color="success"
                size="sm"
                className="ms-3"
                onClick={() => handleSendRequest(user.id)}
                disabled={sendingUserId === user.id}
              >
                <FontAwesomeIcon icon={faUserPlus} /> <TranslatedText text="addFriend" ns="friendsPopup" />
              </Button>
            )}
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
};

FriendUserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      username: PropTypes.string.isRequired,
    })
  ).isRequired,
  getFriendStatus: PropTypes.func.isRequired,
  handleSendRequest: PropTypes.func.isRequired,
  sendingUserId: PropTypes.string,
};


export default FriendUserList;
