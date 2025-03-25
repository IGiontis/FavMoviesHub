import { memo } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import BadgeFriendList from "../../components/BadgeFriendList";
import useFriendToggleListener from "../../hooks/useFriendToggleListener";

const NavigationFriendButton = memo(() => {
  const { isAddFriendOpen, requestCount, handleToggleAddFriend } = useFriendToggleListener();

  return (
    <button
      onClick={handleToggleAddFriend}
      className={classNames(
        "btn btn-link nav-link p-0 border-0 me-2 position-relative",
        { "add-friend-active": isAddFriendOpen } //  Conditionally apply class
      )}
      aria-label="Open friend requests"
    >
      <FontAwesomeIcon icon={faUserPlus} size="xs" />
      <BadgeFriendList requestCount={requestCount} />
    </button>
  );
});

NavigationFriendButton.displayName = "NavigationFriendButton";
export default NavigationFriendButton;
