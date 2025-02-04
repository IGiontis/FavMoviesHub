import { Routes, Route } from "react-router-dom";
import LandingPage from "../components/LandingPage/LandingPage";
import CreateAccount from "../pages/SignInCreateNew/CreateAccount";
import SignIn from "../pages/SignInCreateNew/SignIn";
import PageNotFound from "../pages/PageNotFound";
import UserProfileTabs from "../pages/UserProfile/UserProfileTabs";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/register" element={<CreateAccount />} />
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/profile" element={<UserProfileTabs />} />
    <Route path="*" element={<PageNotFound />} />
  </Routes>
);

export default AppRoutes;
