import PropTypes from "prop-types";
import NavbarLandingPage from "./LandingPage/NavbarLandingPage";
import { Col, Container, Row } from "reactstrap";

const Layout = ({ children }) => {
  return (
    <>
      <NavbarLandingPage />
      <Container fluid className="mt-4">
        <Row>
          <Col>{children}</Col>
        </Row>
      </Container>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children is properly defined
};

export default Layout;
