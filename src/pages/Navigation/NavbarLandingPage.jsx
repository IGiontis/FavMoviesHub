import { useState, useCallback, useMemo } from "react";
import { Navbar, NavbarBrand, Nav, Collapse, NavbarToggler, Modal } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/authSlice";
import SignIn from "../../auth/SignInCreateNew/SignIn";
import CreateAccount from "../../auth/SignInCreateNew/CreateAccount";
import ConfirmationModal from "@/components/ConfirmationModal";
import NavigationLinks from "./NavigationLinks";

import { memo } from "react";

import LanguageSwitcher from "../../components/LanguageSwitcher";
import NavigationButtons from "./NavigationButtons";

const NavbarLandingPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const memoizedUser = useMemo(() => user, [user]);

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
  const openSignIn = useCallback(() => openModal("sign-in"), [openModal]);

  return (
    <>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand tag={Link} to="/" className="me-auto d-flex align-items-center justify-content-between">
          <span className="me-3">Fav Movies Share</span>
          <LanguageSwitcher />
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse isOpen={isOpen} navbar>
          <Nav
            className="ms-auto d-flex flex-wrap align-items-center justify-content-between flex-row gap-2 navbar-nav"
            navbar
          >
            <NavigationButtons user={memoizedUser} />;
            <NavigationLinks
              user={memoizedUser}
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
        {modalState.type === "create-account" && <CreateAccount toggleModal={closeModal} openSignIn={openSignIn} />}
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

export default memo(NavbarLandingPage);
