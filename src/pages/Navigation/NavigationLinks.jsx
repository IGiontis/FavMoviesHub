import PropTypes from "prop-types";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

const NavigationLinks = React.memo(
  ({ user, toggleModal, setModalContent, toggleDropdown, isDropdownOpen, setIsConfirmationModalOpen }) => {
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
        <NavItem>
          <NavLink tag={Link} to="/services" className={`nav-link ${isActive("/services")}`}>
            Services
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
                <DropdownItem
                  onClick={() => {
                    setModalContent("sign-in");
                    toggleModal();
                  }}
                >
                  Sign In
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setModalContent("register");
                    toggleModal();
                  }}
                >
                  Register
                </DropdownItem>
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
  toggleModal: PropTypes.func.isRequired,
  setModalContent: PropTypes.func.isRequired,
  toggleDropdown: PropTypes.func.isRequired,
  setIsConfirmationModalOpen: PropTypes.func.isRequired,
  isDropdownOpen: PropTypes.bool.isRequired,
};
export default NavigationLinks;
