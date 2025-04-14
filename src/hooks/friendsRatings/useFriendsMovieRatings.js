import { useState, useEffect } from "react";
import { useFriends } from "../useFriends";
import { listenToFriendsMovieRatings } from "../../services/movieRatings/listenToFriendsMovieRatings";

const useFriendsMovieRatings = (userID, movieID) => {
  const { data: friends } = useFriends(userID);
  const [friendsRatings, setFriendsRatings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!friends || friends.length === 0 || !movieID) {
      setFriendsRatings([]);
      setIsLoading(false);
      return undefined;
    }

    let unsubscribe;

    const fetchRatings = async () => {
      try {
        setIsLoading(true);

        unsubscribe = listenToFriendsMovieRatings(userID, friends, movieID, (ratings) => {
          setFriendsRatings(ratings);
          setIsLoading(false);
        });
      } catch (err) {
        setError(err);
        setIsLoading(false);
        console.error("Error listening to friends' ratings:", err);
      }
    };

    fetchRatings();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [friends, movieID, userID]);

  return { data: friendsRatings, isLoading, isError: !!error, error };
};

export default useFriendsMovieRatings;
