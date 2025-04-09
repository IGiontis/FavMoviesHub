import { memo, useCallback, useState } from "react";
import { Card, CardBody, CardImg, CardTitle } from "reactstrap";

import PropTypes from "prop-types";
import MovieRating from "../../components/MovieRatings/MovieRating";
import defaultImage from "../../assets/movieBackground.jpeg";
import MovieCommentsModal from "../../components/MovieComments/MovieCommentsModal";
import MovieInteractionButtons from "../../components/MovieComments/MovieInteractionButtons";
import useFriendsMovieComments from "../../hooks/comments/useFriendsMovieComments";
import TranslatedText from "../../components/Language/TranslatedText";
import MovieLikeButton from "../Buttons/MovieLikeButton";

const MovieCard = ({ movie, isLiked, isProcessing, handleMovieLike, user }) => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isFriendsCommentsShow, setIsFriendsCommentsShow] = useState(false);

  const posterSrc = movie.Poster !== "N/A" ? movie.Poster : defaultImage;

  //  Fetch friends' comments immediately
  const { data: friendsComments = [] } = useFriendsMovieComments(user?.uid, movie.imdbID);
  const friendsCommentCount = friendsComments.length; // Count comments directly

  const toggleCommentModal = useCallback(() => setIsCommentModalOpen((prev) => !prev), []);
  const toggleShowFriendsComments = useCallback(() => setIsFriendsCommentsShow((prev) => !prev), []);

  return (
    <Card className="position-relative">
      {user && (
        <MovieLikeButton
          isLiked={isLiked}
          handleMovieLike={handleMovieLike}
          movie={movie}
          isProcessing={isProcessing}
        />
      )}

      <CardImg
        top
        width="100%"
        height="400px"
        src={posterSrc}
        alt={movie.Title}
        loading="lazy"
        style={{ objectFit: "fill" }}
      />

      <CardBody>
        <CardTitle tag="h5" className="d-flex align-items-center justify-content-between">
          <div>{movie.Title}</div>
        </CardTitle>

        <div className="d-flex align-items-center justify-content-between">
          <div>
            <p className="mb-0 mt-4">
              <TranslatedText text="year" ns="movie" />
              <strong>{movie.Year}</strong>
            </p>
            <p className="mb-0">
              <TranslatedText text="type" ns="movie" />{" "}
              <strong>
                {movie.Type === "movie" ? (
                  <TranslatedText text="movie" ns="movie" />
                ) : (
                  <TranslatedText text="series" ns="movie" />
                )}
              </strong>
            </p>
          </div>

          {user && <MovieRating movieID={movie.imdbID} userID={user.uid} />}
        </div>

        {user && (
          <>
            <MovieInteractionButtons
              toggleCommentModal={toggleCommentModal}
              toggleShowFriendsComments={toggleShowFriendsComments}
              friendsCommentCount={friendsCommentCount}
              user={user}
              movie={movie}
              isFriendsCommentsShow={isFriendsCommentsShow}
              friendsComments={friendsComments}
            />

            <MovieCommentsModal
              movieID={movie.imdbID}
              userID={user.uid}
              isOpen={isCommentModalOpen}
              toggleModal={toggleCommentModal}
              movieTitle={movie.Title}
            />
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default memo(MovieCard);

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Poster: PropTypes.string,
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    Type: PropTypes.string.isRequired,
    imdbID: PropTypes.string.isRequired,
  }).isRequired,
  isLiked: PropTypes.bool.isRequired,
  isProcessing: PropTypes.bool.isRequired,
  handleMovieLike: PropTypes.func.isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }), // Optional since the app might be used without login
};
