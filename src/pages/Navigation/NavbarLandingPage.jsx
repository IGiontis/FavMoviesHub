import { useState, useCallback } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Collapse,
  NavbarToggler,
  Modal,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import SignIn from "../SignInCreateNew/SignIn";
import CreateAccount from "../SignInCreateNew/CreateAccount";
import ConfirmationModal from "../../components/ConfirmationModal";

import NavigationLinks from "./NavigationLinks";

const NavbarLandingPage = ({ toggleTheme, isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate("/");
    setIsConfirmationModalOpen(false);
  }, [dispatch, navigate]);

  const toggleNavbar = () => setIsOpen((prev) => !prev);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleModal = () => setModalOpen((prev) => !prev);

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
           
              <NavLink onClick={toggleTheme} className="nav-link" style={{ cursor: "pointer" }}>
                {isDarkMode ? (
                  <FontAwesomeIcon icon={faSun} size="lg" />
                ) : (
                  <FontAwesomeIcon icon={faMoon} size="lg" />
                )}
              </NavLink>
            </NavItem>
            <NavigationLinks
              user={user}
              toggleModal={toggleModal}
              setModalContent={setModalContent}
              toggleDropdown={toggleDropdown}
              isDropdownOpen={isDropdownOpen}
              setIsConfirmationModalOpen={setIsConfirmationModalOpen}
            />
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
