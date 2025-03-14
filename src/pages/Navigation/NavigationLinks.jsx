import PropTypes from "prop-types";
import React, { useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

const NavigationLinks = React.memo(
  ({ user, openModal, toggleDropdown, isDropdownOpen, setIsConfirmationModalOpen }) => {
    const location = useLocation();

    // ✅ Memoize isActive function for better performance
    const isActive = useCallback(
      (path) => (location.pathname === path ? "active" : ""),
      [location.pathname]
    );

    // ✅ Handle logout using a button (better accessibility & SEO)
    const handleLogout = (e) => {
      e.preventDefault();
      setIsConfirmationModalOpen(true); // Show confirmation modal
    };

    return (
      <div className="d-flex align-items-center gap-2">
        <NavItem>
          <NavLink tag={Link} to="/" className={`nav-link ${isActive("/")}`}>
            Home
          </NavLink>
        </NavItem>

        {user && (
          <>
            <NavItem>
              <NavLink tag={Link} to="/friends" className={`nav-link ${isActive("/friends")}`}>
                Friends
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/profile" className={`nav-link ${isActive("/profile")}`}>
                Profile
              </NavLink>
            </NavItem>
          </>
        )}

        <NavItem>
          <NavLink tag={Link} to="/about" className={`nav-link ${isActive("/about")}`}>
            About
          </NavLink>
        </NavItem>

        {user ? (
          <NavItem>
            <button className="nav-link btn btn-link" style={{ cursor: "pointer" }} onClick={handleLogout}>
              Logout
            </button>
          </NavItem>
        ) : (
          <NavItem>
            <Dropdown isOpen={isDropdownOpen} toggle={toggleDropdown} className="border-0 p-sm-2 p-0">
              <DropdownToggle
                caret
                className="nav-link p-0 border-0 bg-transparent"
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                Sign In / Register
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem role="button" tabIndex="0" onClick={() => openModal("sign-in")}>
                  Sign In
                </DropdownItem>
                <DropdownItem role="button" tabIndex="0" onClick={() => openModal("create-account")}>
                  Register
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavItem>
        )}
      </div>
    );
  }
);

NavigationLinks.displayName = "NavigationLinks";

NavigationLinks.propTypes = {
  user: PropTypes.object,
  openModal: PropTypes.func.isRequired,
  toggleDropdown: PropTypes.func.isRequired,
  setIsConfirmationModalOpen: PropTypes.func.isRequired,
  isDropdownOpen: PropTypes.bool.isRequired,
};

export default NavigationLinks;
