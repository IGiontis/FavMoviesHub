import { useState, useCallback, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { useFriends } from "../../hooks/useFriends";
import { useFetchUsernames } from "../../hooks/useFetchUsernames";
import { useLikedMovies } from "../../hooks/useFetchLikedMovies";
import useLikedMoviesActions from "@/hooks/useLikedMoviesActions";
import MovieCard from "../../components/MovieCard/MovieCard";
import FriendsList from "./FriendsList";
import TranslatedText from "../../components/Language/TranslatedText";
import FriendTitleButton from "./FriendTitleButton";
import LoaderSpinner from "../../components/LoaderSpinner";
import { Skeleton } from "@mui/material"; 
import "../UserProfile/userProfileTabs.css";

const FriendsTab = () => {
  // Fetch user data
  const currentUser = useSelector((state) => state.auth.user);
  const userId = currentUser?.uid;

  // Fetch friends and their usernames
  const { data: friends = [], isLoading: isFriendsLoading } = useFriends(userId);
  const userIds = useMemo(() => friends.map((friend) => friend.user2), [friends]);
  const usernames = useFetchUsernames(userIds);

  // Fetch my liked movies
  const { likedMovies: myLikedMovies = [] } = useLikedMovies(userId);
  const { addMovieMutation, removeMovieMutation } = useLikedMoviesActions(userId);

  // Manage selected friend & disable selection while loading
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isFriendSelectionDisabled, setIsFriendSelectionDisabled] = useState(false);
  const { likedMovies: friendsLikedMovies = [], isLoading: isMoviesLoading } = useLikedMovies(selectedFriend);

  // Handle friend selection (disable selection until data loads)
  const handleFriendSelection = useCallback(
    (friendId) => {
      if (friendId !== selectedFriend && !isFriendSelectionDisabled) {
        setSelectedFriend(friendId);
        setIsFriendSelectionDisabled(true); // Disable selection until movies load
      }
    },
    [selectedFriend, isFriendSelectionDisabled]
  );

  // Check if a movie is liked by me
  const isLikedByMe = useCallback(
    (movie) => myLikedMovies.some((likedMovie) => likedMovie.imdbID === movie.imdbID),
    [myLikedMovies]
  );

  // Handle liking/unliking movies
  const handleMovieLike = useCallback(
    (movie) => {
      isLikedByMe(movie) ? removeMovieMutation.mutate(movie.imdbID) : addMovieMutation.mutate(movie);
    },
    [isLikedByMe, removeMovieMutation, addMovieMutation]
  );

  // Re-enable friend selection when movies finish loading
  useEffect(() => {
    if (!isMoviesLoading && selectedFriend) {
      setIsFriendSelectionDisabled(false);
    }
  }, [isMoviesLoading, selectedFriend]);

  // Render Friends List Section
  const renderFriendsList = () => {
    if (isFriendsLoading) return <LoaderSpinner />; // Change spinner to a loader component if needed
    if (friends.length === 0) return <p>No friends yet.</p>;

    return (
      <FriendsList
        friends={friends}
        handleFriendSelection={handleFriendSelection}
        selectedFriend={selectedFriend}
        usernames={usernames}
        isFriendSelectionDisabled={isFriendSelectionDisabled}
      />
    );
  };

  // Render Liked Movies Section with Skeleton Loader
  const renderLikedMovies = () => {
    if (!selectedFriend) return null;

    return (
      <Row className="pt-3">
        <Col>
          <h4>
            <TranslatedText text="likedMoviesOfSelectedFriend" ns="friendsTab" />
          </h4>
          {isMoviesLoading && (
            <Row>
              {/* Skeleton loader for the MovieCards */}
              {[...Array(6)].map((_, index) => (
                <Col key={index} className="mb-4" xs={12} sm={6} md={6} lg={5} xl={4} xxl={3}>
                  <Skeleton variant="rectangular" height={400} />
                </Col>
              ))}
            </Row>
          )}
          {!isMoviesLoading && friendsLikedMovies.length === 0 && (
            <p>
              <TranslatedText text="noLikedMovies" ns="friendsTab" />
            </p>
          )}
          {!isMoviesLoading && friendsLikedMovies.length > 0 && (
            <Row>
              {friendsLikedMovies.map((movie) => (
                <Col className="mb-4" key={movie.id} xs={12} sm={6} md={6} lg={5} xl={4} xxl={3}>
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
    );
  };

  return (
    <>
      <Container fluid className="pt-3 px-4">
        <Row>
          <Col>
            <FriendTitleButton />
          </Col>
        </Row>
        {renderFriendsList()}
      </Container>

      <Container fluid className=" pt-0  px-4 content-container">
        {renderLikedMovies()}
      </Container>
    </>
  );
};

export default FriendsTab;
