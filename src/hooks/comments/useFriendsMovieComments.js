import { useState, useEffect } from "react";
import { useFriends } from "../useFriends";
import { listenToFriendsMovieComments } from "../../services/movieComments/listenToFriendsMovieComments";

const useFriendsMovieComments = (userID, movieID) => {
  const { data: friends } = useFriends(userID);
  const [friendsComments, setFriendsComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!friends || friends.length === 0 || !movieID) {
      setFriendsComments([]); // Clear previous comments if no friends or no movie
      setIsLoading(false);
      return undefined;
    }

    let unsubscribe;
    const fetchComments = async () => {
      try {
        setIsLoading(true); // Start loading

        // Here, we simulate loading while the comments are being fetched
        unsubscribe = listenToFriendsMovieComments(friends, movieID, (comments) => {
          setFriendsComments(comments);  // Update with fetched comments
          setIsLoading(false);  // Stop loading once comments are set
        });

      } catch (err) {
        setError(err);
        setIsLoading(false);  // Make sure to stop loading on error
        console.error("Error listening to friends' comments:", err);
      }
    };

    fetchComments();

    return () => {
      if (unsubscribe) unsubscribe(); // Cleanup listener when dependencies change
    };
  }, [friends, movieID]);

  return { data: friendsComments, isLoading, isError: !!error, error };
};

export default useFriendsMovieComments;
