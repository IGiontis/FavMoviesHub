import PropTypes from "prop-types";
import NavbarLandingPage from "./LandingPage/NavbarLandingPage";

const Layout = ({ children, toggleTheme, isDarkMode }) => {
  return (
    <>
      <NavbarLandingPage toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <div
        className={`container-height  overflow-auto
        `}
      >
        {children}
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default Layout;
