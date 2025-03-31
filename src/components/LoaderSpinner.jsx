import {  Container, Spinner } from "reactstrap";
import PropTypes from "prop-types";

const LoaderSpinner = ({ text = "Loading..." }) => {
  return (
    <Container fluid className="d-flex flex-column align-items-center justify-content-center">
      <Spinner color="primary" />
      <p className="mt-2">{text}</p>
    </Container>
  );
};

LoaderSpinner.propTypes = {
  text: PropTypes.string,
};

export default LoaderSpinner;
