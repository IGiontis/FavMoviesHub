import { useDispatch, useSelector } from "react-redux";
import { useListenForFriendRequests } from "./useReceivedFriendRequests";
import { useFriendRequestCount } from "./useFriendRequestCount";
import { useCallback } from "react";
import { toggleAddFriend } from "../redux/friendSlice";

const useFriendToggleListener = () => {
  const dispatch = useDispatch();
  const isAddFriendOpen = useSelector((state) => state.friends.isAddFriendOpen);
  const currentUser = useSelector((state) => state.auth.user);

  //  Fetch friend requests only when user is logged in
  useListenForFriendRequests(currentUser?.uid); // Auto-updates on new requests
  const requestCount = useFriendRequestCount(currentUser?.uid); // Use the custom hook

  //  Memoized handler to prevent unnecessary re-renders
  const handleToggleAddFriend = useCallback(
    (e) => {
      e.preventDefault(); // Prevent form submission
      dispatch(toggleAddFriend());
    },
    [dispatch]
  );

  return { isAddFriendOpen, requestCount, handleToggleAddFriend };
};

export default useFriendToggleListener;
