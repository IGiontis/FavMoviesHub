import PropTypes from "prop-types";
import { Button, Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./likedMoviesListCard.css";

import CancelSaveButtons from "./FormInputs/CancelSaveButtons";
import { useState } from "react";

const LikedMoviesListCard = ({ localLikedMovies, deleteMovie, clearMovieList, handleSaveMovies }) => {
  const [isFullShowInfo, setIsFullShow] = useState(true);

  const toggleShowFullInfo = () => {
    setIsFullShow(!isFullShowInfo);
  };

  return (
    <Card style={{ maxHeight: "300px", overflow: "hidden" }}>
      <CardHeader className="sticky-top">
        <div className="d-flex flex-wrap align-items-center justify-content-between">
          <div className="me-4">Your list of liked movies</div>
          <Button type="button" color="link" className="p-0" onClick={toggleShowFullInfo}>
            {isFullShowInfo ? <FontAwesomeIcon icon={faChevronDown} /> : <FontAwesomeIcon icon={faChevronUp} />}
          </Button>
        </div>
      </CardHeader>

      {isFullShowInfo && (
        <>
          {/* Add a wrapper class "liked-movies-container" */}
          <CardBody className="main-color liked-movies-container" style={{ height: "300px", overflowY: "auto" }}>
            {localLikedMovies.map((movie, index) => {
              return (
                <div
                  key={index}
                  className="movie-item d-flex justify-content-between align-items-center mb-3"
                  style={{
                    borderBottom: "1px solid #ccc",
                    paddingBottom: "8px",
                  }}
                >
                  <div className="me-2">{movie.Title}</div>

                  <div className="d-flex">
                    {/* Delete Button */}
                    <Button className="p-0" color="link" size="sm" onClick={() => deleteMovie(movie.imdbID)}>
                      <FontAwesomeIcon icon={faTrash} className="text-danger" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </CardBody>

          <CardFooter>
            <CancelSaveButtons cancelLabel="Clear all" onCancel={clearMovieList} onSave={handleSaveMovies} />
          </CardFooter>
        </>
      )}
    </Card>
  );
};

LikedMoviesListCard.propTypes = {
  localLikedMovies: PropTypes.array.isRequired,
  handleSaveMovies: PropTypes.func.isRequired,
  deleteMovie: PropTypes.func.isRequired,
  clearMovieList: PropTypes.func.isRequired,
};

export default LikedMoviesListCard;
