import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage";
import CreateAccount from "../pages/SignInCreateNew/CreateAccount";
import PageNotFound from "../pages/PageNotFound";
import UserProfileTabs from "../pages/UserProfile/UserProfileTabs";
import AboutTab from "../pages/AboutTab";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/register" element={<CreateAccount />} />
    <Route path="/about" element={<AboutTab />} />
    <Route path="/profile" element={<UserProfileTabs />} />
    <Route path="*" element={<PageNotFound />} />
  </Routes>
);

export default AppRoutes;
