import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import NavbarLandingPage from "../pages/Navigation/NavbarLandingPage";
import { ToastContainer, Zoom } from "react-toastify";
import FriendPopUpTabCard from "@/pages/FriedPopUpTabCard/AddFriendCard";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const isAddFriendOpen = useSelector((state) => state.friends.isAddFriendOpen);
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      <NavbarLandingPage />
      {isAddFriendOpen && user && <FriendPopUpTabCard />}
      <div className="container-height overflow-auto">
        {children}
        <footer className="text-center p-4  ">
          <p>© 2024 ILIAS GIONTIS. All Rights Reserved.</p>
          <div className="mt-2">
            <Link to="/terms" className="text-primary mx-2">
              Όροι Χρήσης
            </Link>
            <Link to="/privacy" className="text-primary mx-2">
              Πολιτική Απορρήτου
            </Link>
          </div>
        </footer>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Zoom}
        theme="light"
        style={{ zIndex: 999999 }}
      />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
