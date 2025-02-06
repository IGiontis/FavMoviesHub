import PropTypes from "prop-types";
import { Card, CardBody } from "reactstrap";

const LikedMoviesListCard = ({ localLikedMovies }) => {
    console.log(localLikedMovies);
  return (
    <Card>
      <CardBody>
        {localLikedMovies.map((movie, index) => (
          <div key={index}>{movie.Title}</div>
        ))}
      </CardBody>
    </Card>
  );
};

LikedMoviesListCard.propTypes = {
  localLikedMovies: PropTypes.array.isRequired,
};

export default LikedMoviesListCard;
