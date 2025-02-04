import PropTypes from "prop-types";
import { Card, CardBody, CardImg, CardTitle, Col, Row } from "reactstrap";

const SearchedMovies = ({ filteredMovies }) => {
  return (
    <Row>
      {filteredMovies.length > 0 ? (
        filteredMovies.map((movie) => (
          <Col key={movie.imdbID} xs={12} sm={6} md={4} lg={3} xl="2" className="mb-4">
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
                  <p>
                    Year: <strong>{movie.Year}</strong>
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
  );
};

export default SearchedMovies;

// ✅ Fix: Use "propTypes" (not "prototypes")
SearchedMovies.propTypes = {
  filteredMovies: PropTypes.array.isRequired, // Ensure it is an array
};
