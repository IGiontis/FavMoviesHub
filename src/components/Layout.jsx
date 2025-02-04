import PropTypes from "prop-types";
import NavbarLandingPage from "./LandingPage/NavbarLandingPage";

import classNames from "classnames";

const Layout = ({ children, toggleTheme, isDarkMode }) => {
  return (
    <>
      <NavbarLandingPage toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <div
        className={classNames(" container-height app-container overflow-auto", {
          "bg-light-blue": !isDarkMode, // Light mode background
          "bg-dark-navy": isDarkMode, // Dark mode background
        })}
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
