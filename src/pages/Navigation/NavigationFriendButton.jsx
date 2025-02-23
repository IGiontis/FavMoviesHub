import { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleAddFriend } from "../../redux/friendSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useListenForFriendRequests, useReceivedFriendRequests } from "../../hooks/useReceivedFriendRequests";
import BadgeFriendList from "../../components/BadgeFriendList";

const NavigationFriendButton = memo(() => {
  const dispatch = useDispatch();
  const isAddFriendOpen = useSelector((state) => state.friends.isAddFriendOpen);
  const currentUser = useSelector((state) => state.auth.user);

  // ✅ Fetch friend requests only when user is logged in
  const { data: receivedRequests = [] } = useReceivedFriendRequests(currentUser?.uid);
  useListenForFriendRequests(currentUser?.uid); // Auto-updates on new requests
  
  // ✅ Store request count to avoid unnecessary recalculations
  const requestCount = receivedRequests.length;

  // ✅ Memoized handler to prevent unnecessary re-renders
  const handleToggleAddFriend = useCallback(() => {
    dispatch(toggleAddFriend());
  }, [dispatch]);

  return (
    <button
      onClick={handleToggleAddFriend}
      className={`btn btn-link nav-link p-0 border-0 me-4 position-relative ${isAddFriendOpen ? "add-friend-active" : ""}`}
    >
      <FontAwesomeIcon icon={faUserPlus} size="sm" />
      <BadgeFriendList requestCount={requestCount} />
    </button>
  );
});


NavigationFriendButton.displayName
export default NavigationFriendButton;
