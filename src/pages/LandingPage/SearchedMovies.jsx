import PropTypes from "prop-types";
import { Button, Card, CardBody, CardImg, CardTitle, Col, Container, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart, faHeart as regularHeart } from "@fortawesome/free-solid-svg-icons";
import LikedMoviesListCard from "../../components/LikedMoviesListCard";
import { useSelector } from "react-redux";
import { useState } from "react";

const SearchedMovies = ({ filteredMovies }) => {
  const user = useSelector((state) => state.auth.user);
  const [localLikedMovies, setLocalLikedMovies] = useState([]);

  const handleMovieLike = (movieID) => {
    setLocalLikedMovies((prev) => {
      if (prev.includes(movieID)) {
        return prev.filter((id) => id !== movieID);
      } else {
        return [...prev, movieID];
      }
    });
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
                        localLikedMovies.some((likedMovie) => likedMovie.imdbID === movie.imdbID)
                          ? solidHeart
                          : regularHeart
                      } // Check if the movie is in the liked list by imdbID
                      size="lg"
                      className={
                        localLikedMovies.some((likedMovie) => likedMovie.imdbID === movie.imdbID)
                          ? "text-danger"
                          : "text-gray-500"
                      } // Optionally change color based on liked status
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

      {localLikedMovies && localLikedMovies.length !== 0 && (
        <div className=" position-fixed bottom-0 end-0 me-4 mb-5">
          <LikedMoviesListCard localLikedMovies={localLikedMovies} />
        </div>
      )}
    </Container>
  );
};

SearchedMovies.propTypes = {
  user: PropTypes.object,
  filteredMovies: PropTypes.array.isRequired,
  localLikedMovies: PropTypes.array.isRequired, // Added prop validation for localLikedMovies
  handleMovieLike: PropTypes.func, // Added prop validation for handleMovieLike function
};

export default SearchedMovies;
