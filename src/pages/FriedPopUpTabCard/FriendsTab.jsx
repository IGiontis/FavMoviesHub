import { useSelector } from "react-redux";
import { ListGroup, ListGroupItem } from "reactstrap";
import { useFriends } from "../../hooks/useFriends";
import { useFetchUsernames } from "../../hooks/useFetchUsernames"; // ✅ Import batch username hook

const FriendsTab = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const { data: friends = [] } = useFriends(currentUser?.uid);

  // ✅ Fetch all usernames at once
  const userIds = friends.map((friend) => friend.user2);
  const usernames = useFetchUsernames(userIds);
  return (
    <div>
      <h5>My Friends</h5>
      <ListGroup>
        {friends.length > 0 ? (
          friends.map((friend, index) => (
            <ListGroupItem key={friend.id}>
              Friend: <strong>{usernames[index].isLoading ? "Loading..." : usernames[index].username}</strong>
            </ListGroupItem>
          ))
        ) : (
          <p>No friends yet.</p>
        )}
      </ListGroup>
    </div>
  );
};

export default FriendsTab;