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
      if (sentRequestsSet.has(userId)) return "pending";
      return "none";
    },
    [friendsSet, sentRequestsSet]
  );

  const handleSendRequest = useCallback(
    (userId) => {
      sendFriendRequest.mutate(
        { senderId: currentUser?.uid, recipientId: userId },
        {
          onSuccess: () => toast.success("Friend request sent successfully!"),
          onError: (error) => toast.error("Error sending friend request: " + error.message),
        }
      );
    },
    [currentUser?.uid, sendFriendRequest]
  );

  const handleSearchChange = useCallback((e) => setSearchTerm(e.target.value), []);
  const clearSearch = useCallback(() => setSearchTerm(""), []);

  return (
    <div>
      <FormGroup className="d-flex   flex-column">
        <Label htmlFor="search-input" className="fw-bold">
          <TranslatedText text="searchUsername" ns="friendsPopup" />
        </Label>
        <SearchInput
          ID="search-input"
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          clearSearch={clearSearch}
          placeholderKey="searchUsernamePlaceholder" // Pass the key for translation
          ns="friendsPopup" // Pass the namespace
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
        <Alert color="info">
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
            sentRequestsSet={sentRequestsSet}
            getFriendStatus={getFriendStatus}
            handleSendRequest={handleSendRequest}
          />
        </>
      )}
    </div>
  );
};

export default FriendSearchTab;
