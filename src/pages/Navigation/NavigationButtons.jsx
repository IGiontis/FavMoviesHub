import { NavItem } from "reactstrap";
import useTheme from "../../hooks/useTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import NavigationFriendButton from "./NavigationFriendButton";
import PropTypes from "prop-types";
import { memo } from "react";

const NavigationButtons = ({ user }) => {
 
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <NavItem className="d-flex align-items-center gap-2">
      <button
        onClick={toggleTheme}
        className="btn btn-link nav-link p-0 border-0 me-2"
        style={{ background: "none", cursor: "pointer" }}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? (
          <FontAwesomeIcon icon={faSun} size="lg" fixedWidth />
        ) : (
          <FontAwesomeIcon icon={faMoon} size="lg" fixedWidth />
        )}
      </button>

      {user && <NavigationFriendButton />}
    </NavItem>
  );
};

NavigationButtons.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }),
};

export default memo(NavigationButtons);
