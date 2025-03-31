import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import LandingPage from "@/pages/LandingPage/LandingPage";
import PageNotFound from "@/pages/PageNotFound";
import ProtectedRoute from "../pages/ProtectedRoute";
import FriendsTab from "../pages/FriendsTab/FriendsTab";
import LoaderSpinner from "../components/LoaderSpinner";

const UserProfileTabs = lazy(() => import("@/pages/UserProfile/UserProfileTabs"));
const AboutTab = lazy(() => import("@/pages/AboutTab"));
const TermsOfUse = lazy(() => import("../pages/TermsOfUse"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));

const AppRoutes = () => (
  <Suspense fallback={<LoaderSpinner/>}>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutTab />} />
      <Route path="/terms" element={<TermsOfUse />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <UserProfileTabs />
          </ProtectedRoute>
        }
      />
      <Route path="friends" element={
        <ProtectedRoute>
       <FriendsTab/>
        </ProtectedRoute>
      }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
