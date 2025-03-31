// src/components/FriendRequestButton.js

import { Button, Spinner } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faClock, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import TranslatedText from "../../components/Language/TranslatedText";
import PropTypes from "prop-types";

const FriendRequestButton = ({ status, onClick, isLoading, disabled }) => {
  let buttonContent;
  let buttonColor;
  let buttonDisabled = disabled || isLoading;
console.log(status)

  switch (status) {
    case "friend":
      buttonContent = (
        <>
          <FontAwesomeIcon icon={faUserCheck} /> <TranslatedText text="friend" ns="friendsPopup" />
        </>
      );
      buttonColor = "secondary";
      break;
    case "pending":
      buttonContent = (
        <>
          <FontAwesomeIcon icon={faClock} /> <TranslatedText text="pending" ns="friendsPopup" />
        </>
      );
      buttonColor = "secondary";
      break;
    case "none":
    default:
      buttonContent = isLoading ? (
        <Spinner size="sm" />
      ) : (
        <>
          <FontAwesomeIcon icon={faUserPlus} /> <TranslatedText text="addFriend" ns="friendsPopup" />
        </>
      );
      buttonColor = "success";
  }

  return (
    <Button color={buttonColor} size="sm" onClick={onClick} disabled={buttonDisabled}>
      {buttonContent}
    </Button>
  );
};

FriendRequestButton.propTypes = {
  status: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default FriendRequestButton;
