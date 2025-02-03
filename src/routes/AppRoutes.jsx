import { Routes, Route } from "react-router-dom";
import LandingPage from "../components/LandingPage/LandingPage";
import CreateAccount from "../components/LandingPage/CreateAccount";
import SignIn from "../components/LandingPage/SignIn";
import PageNotFound from "../pages/PageNotFound";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/register" element={<CreateAccount />} />
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="*" element={<PageNotFound />} />
  </Routes>
);

export default AppRoutes;
