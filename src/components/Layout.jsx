import PropTypes from "prop-types";
import NavbarLandingPage from "./LandingPage/NavbarLandingPage";
import { Col, Container, Row } from "reactstrap";
import classNames from "classnames";

const Layout = ({ children, toggleTheme, isDarkMode }) => {
  return (
    <>
      <NavbarLandingPage toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <Container
        fluid
        className={classNames("pt-4 container-height overflow-auto", {
          "bg-light-blue": !isDarkMode, // Light mode background
          "bg-dark-navy": isDarkMode,   // Dark mode background
        })}
      >
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
