import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import TranslatedText from "../components/Language/TranslatedText";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };
  return (
    <Container fluid className="d-flex justify-content-center mt-5">
      <Row>
        <Col className="d-flex flex-column align-items-center">
          <h4 className="mb-4 me-4"> PAGE NOT FOUND! ☹️</h4>
          <button type="button" onClick={handleGoHome} className="btn btn-primary">
            <TranslatedText text="goToHome" ns="termOfUse" />
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default PageNotFound;
