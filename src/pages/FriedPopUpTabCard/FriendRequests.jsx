import { useSelector } from "react-redux";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { db } from "../../firebase/firebaseConfig";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { useQueryClient } from "@tanstack/react-query";
import { useReceivedFriendRequests } from "../../hooks/useReceivedFriendRequests";
import { useFetchUsernames } from "../../hooks/useFetchUsernames"; // ✅ Import batch username hook

const FriendRequests = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const { data: receivedRequests = [] } = useReceivedFriendRequests(currentUser?.uid);
  const queryClient = useQueryClient();

  // ✅ Fetch all usernames at once
  const userIds = receivedRequests.map((request) => request.senderId);
  const usernames = useFetchUsernames(userIds);

  const acceptRequest = async (request) => {
    try {
      const friendsRef = collection(db, "friends");

      // ✅ Store friendship for both users
      await addDoc(friendsRef, {
        user1: request.senderId,
        user2: request.recipientId,
        since: new Date().toISOString(),
      });

      await addDoc(friendsRef, {
        user1: request.recipientId,
        user2: request.senderId,
        since: new Date().toISOString(),
      });

      // ✅ Remove friend request after accepting
      await deleteDoc(doc(db, "friend_requests", request.id));

      // ✅ Refresh queries so the UI updates
      queryClient.invalidateQueries(["friendRequests"]);
      queryClient.invalidateQueries(["friends", currentUser?.uid]);

      console.log("Friend request accepted successfully!");
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

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
              <Button color="success" size="sm" onClick={() => acceptRequest(request)}>
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
