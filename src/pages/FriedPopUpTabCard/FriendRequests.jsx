import { useSelector } from "react-redux";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useReceivedFriendRequests } from "../../hooks/useReceivedFriendRequests";
import { useFetchUsernames } from "../../hooks/useFetchUsernames";
import { acceptFriendRequest } from "../../services/acceptFriendRequest";
import { toast } from "react-toastify";

const FriendRequests = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const { data: receivedRequests = [] } = useReceivedFriendRequests(currentUser?.uid);
  const queryClient = useQueryClient();

  // ✅ Optimize performance using useMemo
  const userIds = useMemo(() => receivedRequests.map((request) => request.senderId), [receivedRequests]);
  const usernames = useFetchUsernames(userIds);

  // ✅ Track loading state for each request
  const [loadingRequests, setLoadingRequests] = useState({});

  const handleAcceptRequest = async (request) => {
    setLoadingRequests((prev) => ({ ...prev, [request.id]: true })); // Set loading to true

    try {
      await acceptFriendRequest(request, () => {
        queryClient.invalidateQueries(["friendRequests"]);
        queryClient.invalidateQueries(["friends", currentUser?.uid]);
      });

      toast.success("Friend request accepted!");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Failed to accept friend request. Please try again.");
    } finally {
      setLoadingRequests((prev) => ({ ...prev, [request.id]: false })); // Reset loading state
    }
  };

  return (
    <div>
      <h5>Friend Requests</h5>
      {receivedRequests.length === 0 && <p>No friend requests 😞</p>}
      <ListGroup>
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
                disabled={loadingRequests[request.id]} // ✅ Disable button while processing
              >
                {loadingRequests[request.id] ? "Accepting..." : "Accept"}
              </Button>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

export default FriendRequests;
