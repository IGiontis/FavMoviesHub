import { useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row, Card, CardBody, Spinner } from "reactstrap";
import { useFriends } from "../../hooks/useFriends";
import { useFetchUsernames } from "../../hooks/useFetchUsernames";
import { useLikedMovies } from "../../hooks/useFetchLikedMovies";
import MovieCard from "../LandingPage/MovieCard";
import useLikedMoviesActions from "@/hooks/useLikedMoviesActions";

const FriendsTab = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const { data: friends = [], isLoading: isFriendsLoading } = useFriends(currentUser?.uid);
  const { data: myLikedMovies = [] } = useLikedMovies(currentUser?.uid);
  const { addMovieMutation, removeMovieMutation } = useLikedMoviesActions(currentUser?.uid);


  const [selectedFriend, setSelectedFriend] = useState(null);
  const { data: friendsLikedMovies = [], isLoading: isMoviesLoading } = useLikedMovies(selectedFriend);
  
  // ✅ Fetch all usernames at once
  const userIds = useMemo(() => friends.map((friend) => friend.user2), [friends]);
  const usernames = useFetchUsernames(userIds);


  // ✅ Optimized function to select a friend
  const handleFriendSelection = useCallback((friendId) => {
    if (friendId !== selectedFriend) {
      console.log("Selected Friend ID:", friendId);
      setSelectedFriend(friendId);
    }
  }, [selectedFriend]);

  // ✅ Memoized check if a movie is liked by the user
  const isLikedByMe = useCallback(
    (movie) => myLikedMovies.some((likedMovie) => likedMovie.imdbID === movie.imdbID),
    [myLikedMovies]
  );

  // ✅ Memoized function for handling likes/unlikes
  const handleMovieLike = useCallback(
    (movie) => {
      if (isLikedByMe(movie)) {
        removeMovieMutation.mutate(movie.imdbID);
      } else {
        addMovieMutation.mutate(movie);
      }
    },
    [isLikedByMe, removeMovieMutation, addMovieMutation]
  );

  return (
    <Container fluid className="pt-3 px-4">
      <Row>
        <Col>
          <h4 className="mb-4">My Friends</h4>
        </Col>
      </Row>

      {/* Friends List */}
      <Row className="g-3">
        {isFriendsLoading ? (
          <Spinner />
        ) : friends.length === 0 ? (
          <Col>
            <p>No friends yet.</p>
          </Col>
        ) : (
          friends.map((friend, index) => (
            <Col key={friend.id} xs="auto">
              <Card
                onClick={() => handleFriendSelection(friend.user2)}
                style={{ cursor: "pointer" }}
                className={`shadow-sm  text-center ${selectedFriend === friend.user2 ? "bg-light" : ""}`}
              >
                <CardBody>
                  {index + 1}: {" "}
                  <strong>{usernames[index]?.username || <Spinner size="sm" />}</strong>
                </CardBody>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {/* Liked Movies Section */}
      {selectedFriend && (
        <Row className="pt-5">
          <Col>
            <h5>Liked Movies of Selected Friend</h5>
            {isMoviesLoading && <p>Loading movies...</p>}
            {!isMoviesLoading && friendsLikedMovies.length === 0 && <p>No liked movies.</p>}
            {!isMoviesLoading && friendsLikedMovies.length > 0 && (
              <Row className="g-3">
                {friendsLikedMovies.map((movie) => (
                  <Col key={movie.id} xs={12} sm={6} md={6} lg={5} xl={4} xxl={3}>
                    <MovieCard
                      movie={movie}
                      isLiked={isLikedByMe(movie)}
                      isProcessing={addMovieMutation.isPending || removeMovieMutation.isPending}
                      handleMovieLike={handleMovieLike}
                      user={currentUser}
                    />
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default FriendsTab;
