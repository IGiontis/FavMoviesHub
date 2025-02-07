import PropTypes from "prop-types";
import { Button, Card, CardBody, CardImg, CardTitle, Col, Container, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart, faHeart as regularHeart } from "@fortawesome/free-solid-svg-icons";
import LikedMoviesListCard from "../../components/LikedMoviesListCard";
import { useDispatch, useSelector } from "react-redux";
import { addLikedMovie, clearLikedMovies, removeLikedMovie } from "../../redux/likedMoviesSlice";

const SearchedMovies = ({ filteredMovies }) => {
  const dispatch = useDispatch();
  const likedMovies = useSelector((state) => state.likedMovies.likedMovies);
  const user = useSelector((state) => state.auth.user);

  console.log(likedMovies)

  const handleMovieLike = (movie) => {
    if (likedMovies.some((likedMovie) => likedMovie.imdbID === movie.imdbID)) {
      dispatch(removeLikedMovie(movie.imdbID));
    } else {
      dispatch(addLikedMovie(movie));
    }
  };

  const deleteMovie = (movieID) => {
    dispatch(removeLikedMovie(movieID));
  };

  const clearMovieList = () => {
    dispatch(clearLikedMovies());
  };

  return (
    <Container fluid className="position-relative">
      <Row>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <Col key={movie.imdbID} xs={12} sm={6} md={4} lg={3} xl="3" xxl="2" className="mb-4">
              <Card className="position-relative">
                {user && (
                  <Button
                    type="button"
                    className="position-absolute top-0 end-0 m-2 p-1"
                    onClick={() => handleMovieLike(movie)} // Handle like button click
                  >
                    <FontAwesomeIcon
                      icon={
                        likedMovies.some((likedMovie) => likedMovie.imdbID === movie.imdbID) ? solidHeart : regularHeart
                      } // Check if the movie is in the liked list by imdbID
                      size="lg"
                      className={
                        likedMovies.some((likedMovie) => likedMovie.imdbID === movie.imdbID)
                          ? "text-danger"
                          : "text-gray-500"
                      }
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
          ))
        ) : (
          <Col>
            <p>No movies found</p>
          </Col>
        )}
      </Row>

      {user && (
        <div>
          {likedMovies.length > 0 && (
            <div className="position-fixed bottom-0 end-0 me-4 mb-5">
              <LikedMoviesListCard
                localLikedMovies={likedMovies}
                deleteMovie={deleteMovie}
                clearMovieList={clearMovieList}
              />
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

SearchedMovies.propTypes = {
  filteredMovies: PropTypes.array.isRequired,
};

export default SearchedMovies;
