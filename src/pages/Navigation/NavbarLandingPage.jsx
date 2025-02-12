import { useState, useCallback, useMemo } from "react";
import { Navbar, NavbarBrand, Nav, Collapse, NavbarToggler, Modal } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/authSlice";
import SignIn from "../SignInCreateNew/SignIn";
import CreateAccount from "../SignInCreateNew/CreateAccount";
import ConfirmationModal from "@/components/ConfirmationModal";
import NavigationLinks from "./NavigationLinks";
import useTheme from "../../hooks/useTheme";
import { toggleAddFriend } from "../../redux/friendSlice";

const NavbarLandingPage = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  
  // Refactored modal state
  const [modalState, setModalState] = useState({ isOpen: false, type: null });

  const openModal = (type) => setModalState({ isOpen: true, type });
  const closeModal = () => setModalState({ isOpen: false, type: null });

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate("/");
    setIsConfirmationModalOpen(false);
  }, [dispatch, navigate]);

  const handleToggleAddFriend = useCallback(() => {
    dispatch(toggleAddFriend());
  }, [dispatch]);

  const toggleNavbar = () => setIsOpen((prev) => !prev);
  const toggleDropdown = useCallback(() => setIsDropdownOpen((prev) => !prev), []);

  return (
    <>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand tag={Link} to="/" className="me-auto">
          Fav Movies Share
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto d-flex flex-wrap align-items-center flex-row gap-2" navbar>
            <button
              onClick={toggleTheme}
              className="btn btn-link nav-link p-0 border-0 me-3"
              style={{ background: "none", cursor: "pointer" }}
            >
              {isDarkMode ? <FontAwesomeIcon icon={faSun} size="lg" /> : <FontAwesomeIcon icon={faMoon} size="lg" />}
            </button>
            <button
              onClick={handleToggleAddFriend}
              className="btn btn-link nav-link p-0 border-0 me-4"
              style={{ background: "none", cursor: "pointer" }}
            >
              <FontAwesomeIcon icon={faUserPlus} size="md" />
            </button>

            <MemoizedNavigationLinks
              user={user}
              openModal={openModal}
              toggleDropdown={toggleDropdown}
              isDropdownOpen={isDropdownOpen}
              setIsConfirmationModalOpen={setIsConfirmationModalOpen}
            />
          </Nav>
        </Collapse>
      </Navbar>

      {/* Modal Implementation */}
      <Modal isOpen={modalState.isOpen} toggle={closeModal} centered>
        {modalState.type === "sign-in" && <SignIn toggleModal={closeModal} />}
        {modalState.type === "create-account" && <CreateAccount toggleModal={closeModal} />}
      </Modal>

      {/* Confirmation Modal */}
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

/**
 * Memoized version of NavigationLinks to prevent unnecessary re-renders
 */
const MemoizedNavigationLinks = ({ user, openModal, toggleDropdown, isDropdownOpen, setIsConfirmationModalOpen }) => {
  return useMemo(
    () => (
      <NavigationLinks
        user={user}
        openModal={openModal}
        toggleDropdown={toggleDropdown}
        isDropdownOpen={isDropdownOpen}
        setIsConfirmationModalOpen={setIsConfirmationModalOpen}
      />
    ),
    [user, openModal, toggleDropdown, isDropdownOpen, setIsConfirmationModalOpen]
  );
};
