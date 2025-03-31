import { useState, useMemo, useCallback } from "react";
import { Spinner, Alert, Label, FormGroup } from "reactstrap";

import { useSearchUsers } from "../../hooks/useSearchUsers";
import { useDebounce } from "../../hooks/useDebounce";
import { useSelector } from "react-redux";
import { useFriendRequests, useSendFriendRequest } from "../../hooks/useFriendRequests";
import { useFriends } from "../../hooks/useFriends";
import { toast } from "react-toastify";
import SearchInput from "../../components/FormInputs/SearchInput";
import TranslatedText from "../../components/Language/TranslatedText";
import FriendUserList from "./FriendUserList";

const FriendSearchTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sendingUserId, setSendingUserId] = useState(null);
  const [localPendingRequests, setLocalPendingRequests] = useState(new Set());
  const debouncedSearch = useDebounce(searchTerm, 500);
  const currentUser = useSelector((state) => state.auth.user);

  const {
    data: users = [],
    isLoading,
    isError,
  } = useSearchUsers(debouncedSearch.length >= 3 ? debouncedSearch.trim() : "", currentUser?.uid);
  const { data: sentRequests = [] } = useFriendRequests(currentUser?.uid);
  const { data: friends = [] } = useFriends(currentUser?.uid);
  const sendFriendRequest = useSendFriendRequest();

  const sentRequestsSet = useMemo(() => new Set(sentRequests?.map((req) => req.recipientId)), [sentRequests]);
  const friendsSet = useMemo(() => new Set(friends?.flatMap(({ user1, user2 }) => [user1, user2])), [friends]);

  const getFriendStatus = useCallback(
    (userId) => {
      if (friendsSet.has(userId)) return "friend";
      if (sentRequestsSet.has(userId) || localPendingRequests.has(userId)) return "pending";
      return "none";
    },
    [friendsSet, sentRequestsSet, localPendingRequests]
  );

  const handleSendRequest = useCallback(
    (userId) => {
      setSendingUserId(userId);
      setLocalPendingRequests((prev) => new Set([...prev, userId]));

      sendFriendRequest.mutate(
        { senderId: currentUser?.uid, recipientId: userId },
        {
          onSuccess: () => {
            toast.success("Friend request sent successfully!");
            setSendingUserId(null);
          },
          onError: (error) => {
            toast.error("Error sending friend request: " + error.message);
            setSendingUserId(null);
            setLocalPendingRequests((prev) => {
              const newSet = new Set(prev);
              newSet.delete(userId);
              return newSet;
            });
          },
        }
      );
    },
    [currentUser?.uid, sendFriendRequest]
  );

  return (
    <div>
      <FormGroup className="d-flex flex-column">
        <Label htmlFor="search-input" className="fw-bold">
          <TranslatedText text="searchUsername" ns="friendsPopup" />
        </Label>
        <SearchInput
          ID="search-input"
          searchTerm={searchTerm}
          handleSearchChange={(e) => setSearchTerm(e.target.value)}
          clearSearch={() => setSearchTerm("")}
          placeholderKey="searchUsernamePlaceholder"
          ns="friendsPopup"
        />
      </FormGroup>

      {isLoading && (
        <div className="text-center">
          <Spinner size="sm" />
        </div>
      )}
      {isError && (
        <Alert color="danger">
          <TranslatedText text="errorFetchingUsers" ns="friendsPopup" />
        </Alert>
      )}
      {!isLoading && !isError && debouncedSearch.length >= 3 && users.length === 0 && (
        <Alert color="warning">
          <TranslatedText text="noUsersFound" ns="friendsPopup" />
        </Alert>
      )}

      {users.length > 0 && debouncedSearch.length >= 3 && (
        <>
          <div className="fw-bold mb-2">
            <TranslatedText text="usersFound" ns="friendsPopup" />
          </div>
          <FriendUserList
            users={users}
            getFriendStatus={getFriendStatus}
            handleSendRequest={handleSendRequest}
            sendingUserId={sendingUserId}
          />
        </>
      )}
    </div>
  );
};

export default FriendSearchTab;
