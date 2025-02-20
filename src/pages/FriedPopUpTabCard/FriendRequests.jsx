import { useSelector } from "react-redux";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { useQueryClient } from "@tanstack/react-query";
import { useReceivedFriendRequests } from "../../hooks/useReceivedFriendRequests";
import { useFetchUsernames } from "../../hooks/useFetchUsernames"; // ✅ Import batch username hook
import { acceptFriendRequest } from "../../services/acceptFriendRequest";

const FriendRequests = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const { data: receivedRequests = [] } = useReceivedFriendRequests(currentUser?.uid);
  const queryClient = useQueryClient();

  // ✅ Fetch all usernames at once
  const userIds = receivedRequests.map((request) => request.senderId);
  const usernames = useFetchUsernames(userIds);

  const handleAcceptRequest = async (request)=>{
    await acceptFriendRequest(request,()=>{
      queryClient.invalidateQueries(["friendRequests"]);
      queryClient.invalidateQueries(["friends", currentUser?.uid]);
    })
  }

  return (
    <div>
      <h5>Friend Requests</h5>
      <ListGroup>
        {receivedRequests.map((request, index) => (
          <ListGroupItem key={request.id} className="d-flex justify-content-between">
            <span>
              Request from <strong>{usernames[index].isLoading ? "Loading..." : usernames[index].username}</strong>
            </span>
            <div>
              <Button color="success" size="sm" onClick={() => handleAcceptRequest(request)}>
                Accept
              </Button>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

export default FriendRequests;
