import PropTypes from "prop-types";
import { Col, Container, Row } from "reactstrap";
import { useSelector } from "react-redux";
import { useLikedMovies } from "../../hooks/useFetchLikedMovies";
import useLikedMoviesActions from "@/hooks/useLikedMoviesActions";
import MovieCard from "./MovieCard";
import { Skeleton } from "@mui/material";
import LoadMoreWrapper from "../LoadMoreWrapper";

const MoviesGallery = ({ filteredMovies, colSizes }) => {
  const user = useSelector((state) => state.auth.user);
  const { likedMovies, isLoading, error } = useLikedMovies(user?.uid);
  const { addMovieMutation, removeMovieMutation } = useLikedMoviesActions(user?.uid);

  const LOAD_COUNT = 12;

  const handleMovieLike = (movie) => {
    const likedMovie = likedMovies.find((likedMovie) => likedMovie.imdbID === movie.imdbID);
    if (likedMovie) {
      removeMovieMutation.mutate(likedMovie.id);
    } else {
      addMovieMutation.mutate(movie);
    }
  };

  if (isLoading) {
    return (
      <Container fluid>
        <Row>
          {[...Array(LOAD_COUNT)].map((_, index) => (
            <Col key={index} {...colSizes} className="mb-4">
              <Skeleton variant="rectangular" height={400} />
            </Col>
          ))}
        </Row>
      </Container>
    );
  }

  if (error) return <p>Error loading liked movies</p>;

  return (
    <LoadMoreWrapper itemsLength={filteredMovies.length} loadCount={LOAD_COUNT}>
      {(visibleCount) => {
        const moviesToShow = filteredMovies.slice(0, visibleCount);
        return (
          <Container fluid>
            <Row>
              {moviesToShow.length > 0 ? (
                moviesToShow.map((movie) => {
                  const likedMovie = likedMovies.find((likedMovie) => likedMovie.imdbID === movie.imdbID);
                  const isLiked = !!likedMovie;
                  const isProcessing =
                    (addMovieMutation.variables?.imdbID === movie.imdbID && addMovieMutation.isPending) ||
                    (removeMovieMutation.variables?.imdbID === movie.imdbID && removeMovieMutation.isPending);

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
      }}
    </LoadMoreWrapper>
  );
};

MoviesGallery.propTypes = {
  filteredMovies: PropTypes.array.isRequired,
  colSizes: PropTypes.object,
};

export default MoviesGallery;
