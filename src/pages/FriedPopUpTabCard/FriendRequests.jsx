import { useSelector } from "react-redux";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { useReceivedFriendRequests } from "../../hooks/useReceivedFriendRequests";
import { useFetchUsernames } from "../../hooks/useFetchUsernames";
import { useHandleFriendRequest } from "../../hooks/useHandleFriendRequest";
import { useTranslation } from "react-i18next";
import TranslatedText from "../../components/Language/TranslatedText";
import LoaderSpinner from "../../components/LoaderSpinner";

const FriendRequests = () => {
  const { t } = useTranslation();
  const currentUser = useSelector((state) => state.auth.user);
  const { data: receivedRequests = [] } = useReceivedFriendRequests(currentUser?.uid);
  const { handleAcceptRequest, loadingRequests } = useHandleFriendRequest(currentUser?.uid);

  const userIds = receivedRequests.map((request) => request.senderId);
  const usernames = useFetchUsernames(userIds);

  return (
    <div>
      <h5>
        <TranslatedText text="friendRequests" ns="friendsPopup" />
      </h5>
      {receivedRequests.length === 0 && (
        <p>
          {" "}
          <TranslatedText text="noFriendRequests" ns="friendsPopup" />
        </p>
      )}
      <ListGroup className="friends-max-height-tab">
        {receivedRequests.map((request, index) => (
          <ListGroupItem key={request.id} className="d-flex align-items-center g-3 px-2 justify-content-between">
            <span>
              <strong>{usernames[index]?.isLoading ?<LoaderSpinner text="Loading..."/> : usernames[index]?.username || "Unknown"}</strong>
            </span>
            <div>
              <Button
                color="success"
                size="sm"
                onClick={() => handleAcceptRequest(request)}
                disabled={!!loadingRequests[request.senderId]}
              >
                {loadingRequests[request.senderId] ? t("accepting") : t("accept")}
              </Button>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

export default FriendRequests;
