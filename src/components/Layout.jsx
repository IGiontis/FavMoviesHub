import PropTypes from "prop-types";
import NavbarLandingPage from "./LandingPage/NavbarLandingPage";
import { Col, Container, Row } from "reactstrap";

const Layout = ({ children, toggleTheme, isDarkMode }) => {
  return (
    <>
      <NavbarLandingPage toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <Container fluid className="mt-4">
        <Row>
          <Col>{children}</Col>
        </Row>
      </Container>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default Layout;
