import PropTypes from "prop-types";
import { Col, Container, Row } from "reactstrap";
import { useSelector } from "react-redux";
import { useLikedMovies } from "../../hooks/useFetchLikedMovies";
import useLikedMoviesActions from "@/hooks/useLikedMoviesActions";
import MovieCard from "./MovieCard";

const MoviesGallery = ({ filteredMovies, colSizes }) => {
  const user = useSelector((state) => state.auth.user);

  // Correctly using useLikedMovies hook
  const { likedMovies, isLoading, error } = useLikedMovies(user?.uid);
  const { addMovieMutation, removeMovieMutation } = useLikedMoviesActions(user?.uid);

  console.log("Liked Movies:", likedMovies);

  const handleMovieLike = (movie) => {
    const likedMovie = likedMovies.find((likedMovie) => likedMovie.imdbID === movie.imdbID);

    if (likedMovie) {
      removeMovieMutation.mutate(likedMovie.id); // Pass the Firestore document ID for deletion
    } else {
      addMovieMutation.mutate(movie);
    }
  };

  if (isLoading) return <p>Loading movies...</p>;
  if (error) return <p>Error loading liked movies</p>;

  return (
    <Container fluid>
      <Row>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => {
            const likedMovie = likedMovies.find((likedMovie) => likedMovie.imdbID === movie.imdbID);
            const isLiked = !!likedMovie;
            const isProcessing = 
              addMovieMutation.variables?.imdbID === movie.imdbID && addMovieMutation.isPending ||
              removeMovieMutation.variables?.imdbID === movie.imdbID && removeMovieMutation.isPending;

            return (
              <Col key={movie.imdbID} {...colSizes} className="mb-4">
                <MovieCard
                  movie={movie}
                  isLiked={isLiked}
                  isProcessing={isProcessing}
                  handleMovieLike={handleMovieLike}
                  user={user}
                />
              </Col>
            );
          })
        ) : (
          <Col>
            <p>No movies found</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

MoviesGallery.propTypes = {
  filteredMovies: PropTypes.array.isRequired,
  colSizes: PropTypes.object,
};

export default MoviesGallery;
