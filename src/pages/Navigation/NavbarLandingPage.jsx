import { useCallback, useMemo, useReducer } from "react";
import { Navbar, NavbarBrand, Nav, Collapse, NavbarToggler, Modal } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/authSlice";
import SignIn from "../../auth/SignInCreateNew/SignIn";
import CreateAccount from "../../auth/SignInCreateNew/CreateAccount";
import ConfirmationModal from "@/components/ConfirmationModal";
import NavigationLinks from "./NavigationLinks";

import { memo } from "react";

import LanguageSwitcher from "../../components/Language/LanguageSwitcher";
import NavigationButtons from "./NavigationButtons";

const initialState = {
  isNavbarOpen: false,
  isDropdownOpen: false,
  isConfirmationModalOpen: false,
  modal: { isOpen: false, type: null },
};

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_NAVBAR":
      return { ...state, isNavbarOpen: !state.isNavbarOpen };
    case "TOGGLE_DROPDOWN":
      return { ...state, isDropdownOpen: !state.isDropdownOpen };
    case "OPEN_MODAL":
      return { ...state, modal: { isOpen: true, type: action.payload } };
    case "CLOSE_MODAL":
      return { ...state, modal: { isOpen: false, type: null } };
    case "OPEN_CONFIRMATION":
      return { ...state, isConfirmationModalOpen: true };
    case "CLOSE_CONFIRMATION":
      return { ...state, isConfirmationModalOpen: false };
    default:
      return state;
  }
}

const NavbarLandingPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const user = useSelector((state) => state.auth.user);
  const memoizedUser = useMemo(() => user, [user]);
  const navigate = useNavigate();
  const reduxDispatch = useDispatch();

  const handleLogout = useCallback(() => {
    reduxDispatch(logout());
    navigate("/");
    dispatch({ type: "CLOSE_CONFIRMATION" });
  }, [reduxDispatch, navigate]);

  return (
    <>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand tag={Link} to="/" className="me-auto d-flex align-items-center justify-content-between">
          <span>Fav Movies Share</span>
          <LanguageSwitcher />
          <NavigationButtons user={memoizedUser} />
        </NavbarBrand>
        <NavbarToggler onClick={() => dispatch({ type: "TOGGLE_NAVBAR" })} />
        <Collapse isOpen={state.isNavbarOpen} navbar>
          <Nav className="ms-auto d-flex flex-wrap align-items-center navbar-nav" navbar>
            <NavigationLinks
              user={memoizedUser}
              openModal={(type) => dispatch({ type: "OPEN_MODAL", payload: type })}
              toggleDropdown={() => dispatch({ type: "TOGGLE_DROPDOWN" })}
              isDropdownOpen={state.isDropdownOpen}
              setIsConfirmationModalOpen={() => dispatch({ type: "OPEN_CONFIRMATION" })}
            />
          </Nav>
        </Collapse>
      </Navbar>

      <Modal isOpen={state.modal.isOpen} toggle={() => dispatch({ type: "CLOSE_MODAL" })} centered>
        {state.modal.type === "sign-in" && <SignIn toggleModal={() => dispatch({ type: "CLOSE_MODAL" })} />}
        {state.modal.type === "create-account" && (
          <CreateAccount toggleModal={() => dispatch({ type: "CLOSE_MODAL" })} openSignIn={() => dispatch({ type: "OPEN_MODAL", payload: "sign-in" })} />
        )}
      </Modal>

      <ConfirmationModal
        isOpen={state.isConfirmationModalOpen}
        onCancel={() => dispatch({ type: "CLOSE_CONFIRMATION" })}
        onConfirm={handleLogout}
        message="Are you sure you want to log out?"
      />
    </>
  );
};

export default memo(NavbarLandingPage);
