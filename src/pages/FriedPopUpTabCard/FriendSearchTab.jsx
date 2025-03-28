import { useState, useMemo, useCallback } from "react";
import { ListGroup, ListGroupItem, Spinner, Alert, Button, Label, FormGroup } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faClock, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { useSearchUsers } from "../../hooks/useSearchUsers";
import { useDebounce } from "../../hooks/useDebounce";
import { useSelector } from "react-redux";
import { useFriendRequests, useSendFriendRequest } from "../../hooks/useFriendRequests";
import { useFriends } from "../../hooks/useFriends";
import { toast } from "react-toastify";
import SearchInput from "../../components/FormInputs/SearchInput";
import TranslatedText from "../../components/Language/TranslatedText";
import { useTranslation } from "react-i18next";

const FriendSearchTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const currentUser = useSelector((state) => state.auth.user);
  const { t } = useTranslation();
  //  Search only if input is 3+ letters
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
          placeholder={t("searchUsernamePlaceholder", { ns: "friendsPopup" })}
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
          <ListGroup className="friends-max-height-tab">
            {users
              .filter((user) => !sentRequestsSet.has(user.id)) //  Exclude users with pending friend requests
              .map((user) => {
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
                      <Button color="success" size="sm" className="ms-3" onClick={() => handleSendRequest(user.id)}>
                        <FontAwesomeIcon icon={faUserPlus} /> <TranslatedText text="addFriend" ns="friendsPopup" />
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
