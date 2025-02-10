import PropTypes from "prop-types";
import { Button, Card, CardBody, CardImg, CardTitle, Col, Container, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart, faHeart as regularHeart } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useLikedMovies } from "../../services/fetchLikedMovies";
import useLikedMoviesActions from "../../hooks/useLikedMoviesActions";

const SearchedMovies = ({ filteredMovies }) => {
  const user = useSelector((state) => state.auth.user);
  const { data: likedMovies = [], isLoading, error } = useLikedMovies(user?.uid);
  const { addMovieMutation, removeMovieMutation } = useLikedMoviesActions(user?.uid);

  const handleMovieLike = (movie) => {
    if (likedMovies.some((likedMovie) => likedMovie.imdbID === movie.imdbID)) {
      removeMovieMutation.mutate(movie.imdbID);
    } else {
      addMovieMutation.mutate(movie);
    }
  };

  
  if (isLoading) return <p>Loading movies...</p>;
  if (error) return <p>Error loading liked movies</p>;

  return (
    <Container fluid className="position-relative">
      <Row>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => {
            const isLiked = likedMovies.some((likedMovie) => likedMovie.imdbID === movie.imdbID);
            const isProcessing = addMovieMutation.isPending || removeMovieMutation.isPending;

            return (
              <Col key={movie.imdbID} xs={12} sm={6} md={4} lg={3} xl="3" xxl="2" className="mb-4">
                <Card className="position-relative">
                  {user && (
                    <Button
                      type="button"
                      className="position-absolute top-0 end-0 m-2 p-1"
                      onClick={() => handleMovieLike(movie)}
                      disabled={isProcessing} // Button is disabled while saving
                    >
                      <FontAwesomeIcon
                        icon={isLiked ? solidHeart : regularHeart}
                        size="lg"
                        className={isLiked ? "text-danger" : "text-gray-500"}
                      />
                    </Button>
                  )}

                  <CardImg
                    top
                    width="100%"
                    src={movie.Poster !== "N/A" ? movie.Poster : "default-image.jpg"}
                    alt={movie.Title}
                    style={{ height: "300px", objectFit: "cover" }}
                  />
                  <CardBody>
                    <CardTitle>
                      <h5>{movie.Title}</h5>
                      <p className="mb-0 mt-4">
                        Year: <strong>{movie.Year}</strong>
                      </p>
                      <p className="mb-0">
                        Type: <strong>{movie.Type}</strong>
                      </p>
                    </CardTitle>
                  </CardBody>
                </Card>
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

SearchedMovies.propTypes = {
  filteredMovies: PropTypes.array.isRequired,
};

export default SearchedMovies;
