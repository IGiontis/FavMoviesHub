import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarLandingPage from "./components/LandingPage/NavbarLandingPage";
import "./App.css";
import PageNotFound from "./pages/PageNotFound";
import LandingPage from "./components/LandingPage/LandingPage";
import Layout from "./components/Layout";
import CreateAccount from "./components/LandingPage/CreateAccount";
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="about" element={<LandingPage />}>
            <Route index element={<NavbarLandingPage />} />
            <Route path="project/:id" element={<NavbarLandingPage />} />
          </Route>

          <Route path="register" element={<CreateAccount />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
