import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };
  return (
    <Container fluid className="d-flex justify-content-center mt-5">
      <Row>
        <Col className="d-flex align-items-center">
        <h6 className="mb-0 me-4">

          PageNotFound
        </h6>
          <button type="button" onClick={handleGoHome} className="btn btn-primary">
            Go to Home
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default PageNotFound;
