import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Collapse,
  NavbarToggler,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const NavbarLandingPage = ({ toggleTheme, isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand tag={Link} to="/" className="text-white me-auto">
      Fav Movies
      </NavbarBrand>
      <NavbarToggler onClick={toggleNavbar} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ms-auto" navbar style={{ listStyle: "none", paddingLeft: 0 }}>
          <NavItem>
            <NavLink className="text-white nav-link-hover" onClick={toggleTheme} style={{ cursor: "pointer" }}>
              {isDarkMode ? <FontAwesomeIcon icon={faSun} size="lg" /> : <FontAwesomeIcon icon={faMoon} size="lg" />}
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink tag={Link} to="/" className="text-white nav-link-hover">
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/about" className="text-white nav-link-hover">
              About
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/services" className="text-white nav-link-hover">
              Services
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/contact" className="text-white nav-link-hover">
              Contact
            </NavLink>
          </NavItem>

          {/* Dropdown for Sign In/Register */}
          <NavItem className="p-2">
            <Dropdown isOpen={isDropdownOpen} toggle={toggleDropdown} className="border-0">
              <DropdownToggle
                caret
                className="text-white p-0 border-0 bg-transparent nav-link-hover"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                }}
              >
                Sign In / Register
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem tag={Link} to="/sign-in">
                  Sign In
                </DropdownItem>
                <DropdownItem tag={Link} to="/register">
                  Register
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

NavbarLandingPage.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default NavbarLandingPage;
