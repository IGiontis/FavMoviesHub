import PropTypes from "prop-types";
import { Card, CardBody, CardImg, CardTitle, Col, Container, Row } from "reactstrap";

const SearchedMovies = ({ filteredMovies }) => {
  return (
    <Container fluid>
      <Row>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <Col key={movie.imdbID} xs={12} sm={6} md={4} lg={3} xl="3" xxl="2 "className="mb-4">
              <Card>
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
    </Container>
  );
};

export default SearchedMovies;

SearchedMovies.propTypes = {
  filteredMovies: PropTypes.array.isRequired,
};
