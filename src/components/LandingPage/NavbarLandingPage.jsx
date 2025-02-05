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
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import SignIn from "../../pages/SignInCreateNew/SignIn";
import CreateAccount from "../../pages/SignInCreateNew/CreateAccount";
import ConfirmationModal from "../ConfirmationModal";

const NavbarLandingPage = ({ toggleTheme, isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    setIsConfirmationModalOpen(false);
  };

  const toggleNavbar = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleModal = () => setModalOpen(!modalOpen);

  return (
    <>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand tag={Link} to="/" className="text-white me-auto">
          Fav Movies Hub
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
            {user && (
              <NavItem>
                <NavLink tag={Link} to="/profile" className="text-white nav-link-hover">
                  Profile
                </NavLink>
              </NavItem>
            )}
            {user ? (
              <NavItem>
                <NavLink
                  onClick={() => setIsConfirmationModalOpen(true)}
                  className="text-white nav-link-hover"
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </NavLink>
              </NavItem>
            ) : (
              <NavItem className="p-2">
                <Dropdown isOpen={isDropdownOpen} toggle={toggleDropdown} className="border-0">
                  <DropdownToggle
                    caret
                    className="text-white p-0 border-0 bg-transparent nav-link-hover"
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
