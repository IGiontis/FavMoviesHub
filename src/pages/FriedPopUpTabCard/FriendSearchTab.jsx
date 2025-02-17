import { useState, useMemo, useCallback } from "react";
import { Input, ListGroup, ListGroupItem, Spinner, Alert, Button, Label } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faClock, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { useSearchUsers } from "../../hooks/useSearchUsers";
import { useDebounce } from "../../hooks/useDebounce";
import { useSelector } from "react-redux";
import { useFriendRequests, useSendFriendRequest } from "../../hooks/useFriendRequests";
import { useFriends } from "../../hooks/useFriends";
import { toast } from "react-toastify";

const FriendSearchTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const currentUser = useSelector((state) => state.auth.user);
  const { data: users = [], isLoading, isError } = useSearchUsers(debouncedSearch.trim(), currentUser?.uid);

  const { data: sentRequests = [] } = useFriendRequests(currentUser?.uid);
  const { data: friends = [] } = useFriends(currentUser?.uid);

  const sendFriendRequest = useSendFriendRequest();

  console.log(sentRequests);

  // ✅ Memoize friend request check (prevents looping on every render)
  // We convert `sentRequests` into a Set for faster lookup (O(1) time complexity).
  // This avoids using `includes()`, which has O(n) complexity and would require scanning the entire array every time we check if a request was sent.
  // With Set, checking if a user ID exists is much faster, especially when dealing with large lists.
  const sentRequestsSet = useMemo(() => new Set(sentRequests?.map((req) => req.recipientId)), [sentRequests]);

  const friendsSet = useMemo(() => new Set(friends?.flatMap(({ user1, user2 }) => [user1, user2])), [friends]);

  // ✅ Optimized function to check friendship status
  const getFriendStatus = useCallback(
    (userId) => {
      if (friendsSet.has(userId)) return "friend";
      if (sentRequestsSet.has(userId)) return "pending";
      return "none";
    },
    [friendsSet, sentRequestsSet]
  );

  // ✅ Click handler wrapped in useCallback to prevent unnecessary re-renders
  const handleSendRequest = useCallback(
    (userId) => {
      console.log(`Sending friend request from ${currentUser?.uid} to ${userId}`);
      sendFriendRequest.mutate(
        { senderId: currentUser?.uid, recipientId: userId },
        {
          onSuccess: () => {
            toast.success("Friend request sent successfully!");
          },
          onError: (error) => {
            toast.error("Error sending friend request: " + error.message);
          },
        }
      );
    },
    [currentUser?.uid, sendFriendRequest]
  );
  

  return (
    <div>
      <Label htmlFor="search-input" className="fw-bold">
        Search Username
      </Label>

      <Input
        id="search-input"
        type="text"
        placeholder="Type a username..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-3"
      />

      {isLoading && (
        <div className="text-center">
          <Spinner size="sm" />
        </div>
      )}
      {isError && <Alert color="danger">Error fetching users</Alert>}
      {!isLoading && !isError && debouncedSearch && users.length === 0 && <Alert color="info">No users found</Alert>}

      {users.length > 0 && (
        <>
          <div className="fw-bold mb-2">Users Found:</div>
          <ListGroup>
            {users.map((user) => {
              const status = getFriendStatus(user.id);

              return (
                <ListGroupItem key={user.id} className="d-flex justify-content-between align-items-center flex-wrap">
                  <span className="text-truncate flex-grow-1" style={{ wordBreak: "break-word", minWidth: "0" }}>
                    {user.username}
                  </span>

                  {status === "friend" ? (
                    <Button color="secondary" size="sm" className="ms-3" disabled>
                      <FontAwesomeIcon icon={faUserCheck} /> Friend
                    </Button>
                  ) : status === "pending" ? (
                    <Button color="secondary" size="sm" className="ms-3" disabled>
                      <FontAwesomeIcon icon={faClock} /> Pending
                    </Button>
                  ) : (
                    <Button color="success" size="sm" className="ms-3" onClick={() => handleSendRequest(user.id)}>
                      <FontAwesomeIcon icon={faUserPlus} /> Add Friend
                    </Button>
                  )}
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </>
      )}
    </div>
  );
};

export default FriendSearchTab;
