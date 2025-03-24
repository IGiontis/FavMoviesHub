import { useSelector } from "react-redux";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { useReceivedFriendRequests } from "../../hooks/useReceivedFriendRequests";
import { useFetchUsernames } from "../../hooks/useFetchUsernames";
import { useHandleFriendRequest } from "../../hooks/useHandleFriendRequest"; 

const FriendRequests = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const { data: receivedRequests = [] } = useReceivedFriendRequests(currentUser?.uid);
  const { handleAcceptRequest, loadingRequests } = useHandleFriendRequest(currentUser?.uid);

  const userIds = receivedRequests.map((request) => request.senderId);
  const usernames = useFetchUsernames(userIds);

  return (
    <div>
      <h5>Friend Requests</h5>
      {receivedRequests.length === 0 && <p>No friend requests 😞</p>}
      <ListGroup className="friends-max-height-tab">
        {receivedRequests.map((request, index) => (
          <ListGroupItem key={request.id} className="d-flex align-items-center g-3 px-2 justify-content-between">
            <span>
              <strong>{usernames[index]?.isLoading ? "Loading..." : usernames[index]?.username || "Unknown"}</strong>
            </span>
            <div>
              <Button
                color="success"
                size="sm"
                onClick={() => handleAcceptRequest(request)}
                disabled={!!loadingRequests[request.senderId]}
              >
                {loadingRequests[request.senderId] ? "Accepting..." : "Accept"}
              </Button>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

export default FriendRequests;
