import { useState, useCallback } from "react";
import { Navbar, NavbarBrand, Nav, Collapse, NavbarToggler, Modal, NavItem } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/authSlice";
import SignIn from "../../auth/SignInCreateNew/SignIn";
import CreateAccount from "../../auth/SignInCreateNew/CreateAccount";
import ConfirmationModal from "@/components/ConfirmationModal";
import NavigationLinks from "./NavigationLinks";
import useTheme from "../../hooks/useTheme";

import NavigationFriendButton from "./NavigationFriendButton";

const NavbarLandingPage = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();

  // Use a single state object for modal management
  const [modalState, setModalState] = useState({ isOpen: false, type: null });
  const openModal = useCallback((type) => setModalState({ isOpen: true, type }), []);
  const closeModal = useCallback(() => setModalState({ isOpen: false, type: null }), []);

  // Other local state
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  // Handlers wrapped in useCallback
  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate("/");
    setIsConfirmationModalOpen(false);
  }, [dispatch, navigate]);

  const toggleNavbar = useCallback(() => setIsOpen((prev) => !prev), []);
  const toggleDropdown = useCallback(() => setIsDropdownOpen((prev) => !prev), []);

  return (
    <>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand tag={Link} to="/" className="me-auto">
          Fav Movies Share
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse isOpen={isOpen} navbar>
          <Nav
            className="ms-auto d-flex flex-wrap align-items-center justify-content-between flex-row gap-2 navbar-nav"
            navbar
          >
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

            {/* Proper list structure */}
            <NavigationLinks
              user={user}
              openModal={openModal}
              toggleDropdown={toggleDropdown}
              isDropdownOpen={isDropdownOpen}
              setIsConfirmationModalOpen={setIsConfirmationModalOpen}
            />
          </Nav>
        </Collapse>
      </Navbar>

      {/* Modal using consolidated state */}
      <Modal isOpen={modalState.isOpen} toggle={closeModal} centered>
        {modalState.type === "sign-in" && <SignIn toggleModal={closeModal} />}
        {modalState.type === "create-account" && <CreateAccount toggleModal={closeModal} />}
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

export default NavbarLandingPage;
