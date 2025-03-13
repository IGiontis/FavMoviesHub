import { useState, useEffect } from "react";
import { useFriends } from "../useFriends";
import { listenToFriendsMovieComments } from "../../services/movieComments/listenToFirendsMovieComments";
const useFriendsMovieComments = (userID, movieID) => {
  const { data: friends, isLoading: isFriendsLoading } = useFriends(userID);
  const [friendsComments, setFriendsComments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!friends || friends.length === 0 || !movieID) {
      setFriendsComments([]); // Clear previous comments if no friends or no movie
      return undefined;
    }

    let unsubscribe;
    try {
      unsubscribe = listenToFriendsMovieComments(friends, movieID, setFriendsComments);
    } catch (err) {
      setError(err);
      console.error("Error listening to friends' comments:", err);
    }

    return () => {
      if (unsubscribe) unsubscribe(); // Cleanup listener when dependencies change
    };
  }, [friends, movieID]);

  return { data: friendsComments, isLoading: isFriendsLoading, isError: !!error, error };
};

export default useFriendsMovieComments;
