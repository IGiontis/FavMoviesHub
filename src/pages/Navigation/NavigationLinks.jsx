import PropTypes from "prop-types";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

const NavigationLinks = React.memo(
  ({ user, openModal, toggleDropdown, isDropdownOpen, setIsConfirmationModalOpen }) => {
    const location = useLocation();
    const isActive = (path) => (location.pathname === path ? "active" : "");

    return (
      <>
        <NavItem>
          <NavLink tag={Link} to="/" className={`nav-link ${isActive("/")}`}>
            Home
          </NavLink>
        </NavItem>
        {user && (
          <NavItem>
            <NavLink tag={Link} to="/friends" className={`nav-link ${isActive("/friends")}`}>
              Friends
            </NavLink>
          </NavItem>
        )}
        {user && (
          <NavItem>
            <NavLink tag={Link} to="/profile" className={`nav-link ${isActive("/profile")}`}>
              Profile
            </NavLink>
          </NavItem>
        )}

        <NavItem>
          <NavLink tag={Link} to="/about" className={`nav-link ${isActive("/about")}`}>
            About
          </NavLink>
        </NavItem>
        {user ? (
          <NavItem>
            <NavLink
              onClick={() => setIsConfirmationModalOpen(true)}
              className="nav-link"
              style={{ cursor: "pointer" }}
            >
              Logout
            </NavLink>
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
                <DropdownItem onClick={() => openModal("sign-in")}>Sign In</DropdownItem>
                <DropdownItem onClick={() => openModal("create-account")}>Register</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavItem>
        )}
      </>
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
