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
  Modal,
} from "reactstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import SignIn from "../pages/SignInCreateNew/SignIn";
import CreateAccount from "../pages/SignInCreateNew/CreateAccount";
import ConfirmationModal from "./ConfirmationModal";
import { clearLikedMovies } from "../redux/likedMoviesSlice";

const NavbarLandingPage = ({ toggleTheme, isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearLikedMovies());
    navigate("/");
    setIsConfirmationModalOpen(false);
  };

  const toggleNavbar = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleModal = () => setModalOpen(!modalOpen);

  // Helper: add "active" if the link path matches the current route
  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand tag={Link} to="/" className="me-auto">
          Fav Movies Hub
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar style={{ listStyle: "none", paddingLeft: 0 }}>
            <NavItem>
              {/* You may or may not want the theme toggle to be route-dependent */}
              <NavLink onClick={toggleTheme} className={`nav-link ${isActive("")}`} style={{ cursor: "pointer" }}>
                {isDarkMode ? <FontAwesomeIcon icon={faSun} size="lg" /> : <FontAwesomeIcon icon={faMoon} size="lg" />}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/" className={`nav-link ${isActive("/")}`}>
                Home
              </NavLink>
            </NavItem>
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
            {user && (
              <NavItem>
                <NavLink tag={Link} to="/profile" className={`nav-link ${isActive("/profile")}`}>
                  Profile
                </NavLink>
              </NavItem>
            )}
            {user ? (
              <NavItem>
                <NavLink onClick={() => setIsConfirmationModalOpen(true)} className="nav-link" style={{ cursor: "pointer" }}>
                  Logout
                </NavLink>
              </NavItem>
            ) : (
              <NavItem>
                <Dropdown isOpen={isDropdownOpen} toggle={toggleDropdown} className="border-0 p-2">
                  <DropdownToggle caret className="nav-link p-0 border-0 bg-transparent" style={{ backgroundColor: "transparent", border: "none" }}>
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
          </Nav>
        </Collapse>
      </Navbar>

      <Modal isOpen={modalOpen} toggle={toggleModal} centered>
        {modalContent === "sign-in" ? (
          <SignIn toggleModal={toggleModal} />
        ) : (
          <CreateAccount toggleModal={toggleModal} />
        )}
      </Modal>

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onCancel={() => setIsConfirmationModalOpen(false)}
        onConfirm={handleLogout}
        message="Are you sure you want to log out?"
      />
    </>
  );
};

NavbarLandingPage.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default NavbarLandingPage;
