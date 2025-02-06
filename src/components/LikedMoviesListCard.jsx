import PropTypes from "prop-types";
import { Button, Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import CancelSaveButtons from "./FormInputs/CancelSaveButtons";

const LikedMoviesListCard = ({ localLikedMovies, deleteMovie, clearMovieList }) => {
  const handleSaveMovies = () => {
    console.log(localLikedMovies);
  };

  return (
    <Card  style={{ maxHeight: "300px", overflow: "hidden" }}>
      <CardHeader className="sticky-top ">Your list of liked movies</CardHeader>
      <CardBody className="main-color"  style={{ height: "300px", overflowY: "auto" }}>
        {localLikedMovies.map((movie, index) => (
          <div className="d-flex justify-content-between align-items-center mb-3" key={index}>
            <div className="me-2">{movie.Title}</div>
            <Button className="p-0" color="link" size="sm" onClick={() => deleteMovie(movie.imdbID)}>
              <FontAwesomeIcon icon={faTrash} className="text-danger" />
            </Button>
          </div>
        ))}
      </CardBody>
      <CardFooter>
        <CancelSaveButtons cancelLabel="Clear all" onCancel={clearMovieList} onSave={handleSaveMovies} />
      </CardFooter>
    </Card>
  );
};

LikedMoviesListCard.propTypes = {
  localLikedMovies: PropTypes.array.isRequired,
  deleteMovie: PropTypes.func.isRequired,
  clearMovieList: PropTypes.func.isRequired,
};

export default LikedMoviesListCard;
